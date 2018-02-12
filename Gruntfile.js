module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt);
  grunt.config.set('pkg', grunt.file.readJSON('package.json'));
};