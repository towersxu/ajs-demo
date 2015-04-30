/**
 * Created by taox on 15-4-29.
 */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/js/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    jsdoc : {
      dist : {
        src: ['app/js/*.js'],
        options: {
          destination: 'doc'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-jsdoc');
  // 默认被执行的任务列表。
  grunt.registerTask('default', ['concat','uglify','jsdoc']);

};