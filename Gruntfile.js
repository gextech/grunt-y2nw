module.exports = function(grunt) {
  grunt.initConfig({
    yadda: {},
    jasmine_node: {
      all: ['generated/tests']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-jasmine-node');
};
