module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      all: ['generated']
    },
    yadda: {
      jasmine: {
        options: {
          tests_src: 'tests/jasmine'
        }
      },
      nightwatch: {
        options: {
          tests_src: 'tests/nightwatch',
          output_suffix: 'suitcase',
          output_engine: 'nightwatch'
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
