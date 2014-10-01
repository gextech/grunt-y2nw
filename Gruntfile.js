module.exports = function(grunt) {
  grunt.initConfig({
    yadda: {
      local: {
        src: 'tests',
        dest: 'generated'
      }
    },
    nightwatch: {
      options: {
        src_folders: 'generated/tests',
        output_folder: 'generated/report'
      },
      local: {
        standalone: true,
        selenium: {
          cli_args: {
            'webdriver.chrome.driver': '/opt/selenium/chromedriver'
          }
        },
        desiredCapabilities: {
          browserName: 'chrome'
        }
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-nightwatch');
};
