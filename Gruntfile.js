module.exports = function(grunt) {
  grunt.initConfig({
    y2nw: {
      local: {
        src: 'tests',
        dest: 'generated'
      }
    },
    nightwatch: {
      options: {
        argv: grunt.cli.options,
        src_folders: 'generated/tests',
        output_folder: 'generated/report'
      },
      local: {
        standalone: true,
        desiredCapabilities: {
          browserName: 'chrome'
        },
        cli_args: {
          'webdriver.chrome.driver': '/opt/selenium/chromedriver'
        }
      },
      saucelabs: {
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
};
