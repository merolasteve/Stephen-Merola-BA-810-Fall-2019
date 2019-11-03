//The Wrapper Function
module.exports = function (grunt) {
  // Project & task configuration.
  grunt.initConfig({

    //Is this the right place to add this??
    nodemon: {
      dev: { script: 'index.js' }
    },
    //Is this the right place to add this??
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        esversion: 6
      },
      all: ['Gruntfile.js', 'config/*.js']
    },
    //creates task to set env variables, dev and prod
    pkg: grunt.file.readJSON('package.json'),
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      production: {
        NODE_ENV: 'production'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodemon');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('default', [
    'env:dev',
    'jshint',
    'nodemon'
  ]);
  grunt.registerTask('production', [
    'env:production',
    'nodemon'
  ]);
};