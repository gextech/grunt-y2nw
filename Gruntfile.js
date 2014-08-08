module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      all: ['generated']
    },
    yadda: {
      jasmine: {}
    },
    jasmine_node: {
      all: ['generated/tests']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('yadda-jasmine', ['clean', 'yadda:jasmine', 'jasmine_node']);
};
