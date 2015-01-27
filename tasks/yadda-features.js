var fs = require('fs'),
    y2nw = require('y2nw'),
    Async = require('async-parts');

module.exports = function(grunt) {
  grunt.registerMultiTask('y2nw', 'Transform and execute Yadda-features into custom Nightwatch suitcases!', function() {
    var _ = grunt.util._,
        tasks = new Async();

    var options = this.options();

    var doneCallback = this.async();

    this.files.forEach(function(file) {
      var dest = file.orig.dest;

      (file.src || file.orig.src).forEach(function(src) {
        var params = _.merge({ src: src, dest: dest }, options)

        tasks.then(function(next) {
          grunt.log.write('Loading features from "' + params.src + '" ... ');

          y2nw(params, function(err) {
            grunt.log.writeln(err ? 'FAIL' : 'OK');

            if (!err) {
              grunt.log.ok('Saved test files at "' + params.dest + '"');
            }

            next(err);
          });
        });
      });
    });

    tasks.run(function(err) {
      if (err) {
        grunt.fatal(err);
      }

      doneCallback(err);
    });
  });
};
