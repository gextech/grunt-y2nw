module.exports = function(grunt) {
  grunt.registerMultiTask('yadda', 'Precompile Yadda-features into Nightwatch tests!', function() {
    var _ = grunt.util._,
        fs = require('fs'),
        path = require('path'),
        Yadda = require('yadda'),
        coffee = require('coffee-script');

    var options = this.options({
      language: 'English',
      tests_src: 'tests',
      output_suffix: 'spec',
      output_engine: 'jasmine',
      output_folder: 'generated'
    });

    var language = options.language || 'English',
        Language = Yadda.localisation[language] || Yadda.localisation.English;

    function extractSteps(file) {
      var lines = grunt.file.read(file).split('\n'),
          retval = {
            code: '',
            steps: [],
            patterns: {}
          };

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

      var current = [];

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

    function compileScenarios() {
      var output = {
        code: '',
        steps: {},
        patterns: {},
        language: language
      };

      grunt.log.ok('Compiling scenarios from ' + options.tests_src);

      _.each(grunt.file.expand(options.tests_src + '/steps/**/*.{litcoffee,coffee.md}'), function(file) {
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

    function compileFeatures() {
      var parser = new Yadda.parsers.FeatureParser(Language);

      return _.object(_.map(new Yadda.FeatureFileSearch(options.tests_src + '/features').list(), function(file) {
        return [file, parser.parse(grunt.file.read(file))];
      }))
    }

    try {
      var engine_tpl = path.resolve(__dirname + '/../templates/' + options.output_engine + '.coffee'),
          library_tpl = path.resolve(__dirname + '/../templates/_library.coffee');

      if (!fs.existsSync(engine_tpl)) {
        grunt.fatal('Missing template for ' + options.output_engine + ' yadda-output!');
      }

      var features = compileFeatures(),
          scenarios = compileScenarios();

      var engine = _.template(grunt.file.read(engine_tpl))
          library = _.template(grunt.file.read(library_tpl));

      var library_file = path.resolve(options.output_folder) + '/helpers/_library.js',
          library_code = coffee.compile(library(_.merge({}, scenarios, { yadda: require.resolve('yadda') })),  { bare: true });

      grunt.file.write(library_file, library_code);

      _.each(features, function(feature, file) {
        var feature_name = path.basename(file).replace('.feature', '') + '-' + options.output_suffix,
            feature_file = path.resolve(options.output_folder + '/tests/' + feature_name + '.js'),
            feature_code = coffee.compile(engine(feature), { bare: true });

        grunt.file.write(feature_file, feature_code);
        grunt.log.ok('Suitcase saved in ' + feature_file.replace(process.cwd() + '/', ''));
      });

      _.each(grunt.file.expand(options.tests_src + '/helpers/**/*.{coffee,js}'), function(file) {
        grunt.file.copy(file, path.resolve(options.output_folder + '/' + file.replace(options.tests_src, '')));
      });
    } catch (e) {
      grunt.fatal(e);
    }
  });
};
