module.exports = function(grunt) {
  grunt.registerMultiTask('yadda', 'Precompile Yadda-features into Nightwatch tests!', function() {
    var _ = grunt.util._,
        fs = require('fs'),
        path = require('path'),
        Yadda = require('yadda'),
        coffee = require('coffee-script');

    var options = this.options({
      language: 'English',
      steps_src: 'tests/steps',
      features_src: 'tests/features',
      output_folder: 'generated/tests',
      output_filename: 'spec',
      output_template: 'jasmine.coffee'
    });

    if (!fs.existsSync(options.output_template)) {
      options.output_template = path.resolve(__dirname + '/../templates/' + options.output_template);

      if (!fs.existsSync(options.output_template)) {
        grunt.log.error('Missing template for yadda-output!');
      }
    }

    options.output_filename = path.basename(options.output_template).split('.')[0] + '-' + options.output_filename;

    function extractSteps(file) {
      var lines = grunt.file.read(file).split('\n'),
          retval = { code: '', steps: [], patterns: {} },
          current = [];

      function matchPattern(text) {
        return text.match(/^\$(\w+)\s+(.+?)$/);
      }

      function matchLabel(text) {
        return text.match(/^(\w+\s+.+?)$/);
      }

      function matchCode(text) {
        return text.match(/^\s{4}(.+?)$/);
      }

      function addStep() {
        retval.steps.push({ code: '', labels: [] });
      }

      function peak() {
        return retval.steps[retval.steps.length - 1];
      }

      lines.forEach(function(line, offset) {
        var testLine;

        if (testLine = matchPattern(line)) {
          retval.patterns[testLine[1]] = testLine[2];
        }

        if (line.trim()) {
          if (testLine = matchLabel(line)) {
            current.push(testLine[1]);
          } else if (testLine = matchCode(line)) {
            if (current.length) {
              addStep();
              peak().labels = current;
              current = [];
            }

            (retval.steps.length ? peak() : retval).code += testLine[1] + '\n';
          }
        }
      });

      return retval;
    }

    function compileScenarios(files) {
      var output = { code: '', steps: {}, patterns: {} };

      _.each(files, function(file) {
        if (!output.steps[file]) {
          output.steps[file] = [];
        }

        grunt.log.ok('Extracting steps from ' + file);

        var results = extractSteps(file);

        output.patterns = _.merge({}, output.patterns, results.patterns);
        output.code += results.code;

        _.each(results.steps, function(step) {
          var method = 'define';

          step.labels = _.map(step.labels, function(label) {
            var matchMethod = label.match(/^(given|when|then)\s+/i);

            if (matchMethod) {
              method = matchMethod[1].toLowerCase();

              return label.substr(matchMethod[0].length);
            }

            return label;
          });

          output.steps[file].push({ code: step.code, label: step.labels, method: method });
        });
      });

      return output;
    }

    grunt.log.ok('Compiling scenarios from ' + options.features_src);

    var language = Yadda.localisation[options.language] || Yadda.localisation.English,
        features = new Yadda.FeatureFileSearch(options.features_src).list(),
        parser = new Yadda.parsers.FeatureParser(language);

    try {
      var scenarios = compileScenarios(grunt.file.expand(options.steps_src + '/**/*.litcoffee')),
          heading = _.template(grunt.file.read(path.resolve(__dirname + '/../templates/_header.coffee'))),
          script = _.template(grunt.file.read(options.output_template));

      var template_params = _.merge({}, scenarios, {
            language: options.language || 'English',
            features: _.map(features, function(file) {
              return parser.parse(grunt.file.read(file).toString());
            })
          });

      if (options.output_template.indexOf(path.resolve(__dirname + '/../templates')) > -1) {
        template_params.heading = heading(template_params);
      } else {
        template_params.heading = _.isFunction(options.heading) ? options.heading(template_params) : options.heading;
      }

      var generated_file = options.output_folder + '/' + options.output_filename + '.js',
          generated_code = script(template_params);

      grunt.file.write(generated_file, coffee.compile(generated_code, { bare: true }));
      grunt.log.ok('Suitcase saved in ' + generated_file.replace(process.cwd() + '/', ''));
    } catch (e) {
      grunt.fatal(e.message + '\n' + generated_code);
    }
  });
};
