module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      all: ['generated']
    },
    yadda: {
      jasmine: {
        options: {
          steps_src: 'tests/jasmine/steps',
          features_src: 'tests/jasmine/features'
        }
      },
      nightwatch: {
        options: {
          steps_src: 'tests/nightwatch/steps',
          features_src: 'tests/nightwatch/features',
          output_filename: 'suitcase',
          output_template: 'nightwatch.coffee'
        }
      }
    },
    nightwatch: {
      options: {
        standalone: true,
        src_folders: ['generated/tests']
      }
    },
    jasmine_node: {
      all: ['generated/tests']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-nightwatch');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('yadda-jasmine', ['clean', 'yadda:jasmine', 'jasmine_node']);
  grunt.registerTask('yadda-nightwatch', ['clean', 'yadda:nightwatch', 'nightwatch']);
};
