module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      all: ['generated']
    },
    yadda: {
      nightwatch: {
        src: 'tests',
        dest: 'generated'
      }
    },
    nightwatch: {
      options: {
        standalone: true,
        src_folders: ['generated/tests']
      },
      saucelabs: {
        silent: true,
        selenium_host: 'localhost',
        selenium_port: 4445,
        desiredCapabilities: {
          username: '${SAUCE_USERNAME}',
          accessKey: '${SAUCE_ACCESS_KEY}'
        }
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-nightwatch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('test', ['clean', 'yadda', 'nightwatch']);
  grunt.registerTask('test:saucelabs', ['yadda', 'nightwatch:saucelabs']);
};
