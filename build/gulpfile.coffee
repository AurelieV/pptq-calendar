connect     = require 'gulp-connect'
gulp        = require 'gulp'
parameters  = require './parameters.coffee'
requireDir = require 'require-dir'
runSequence = require 'run-sequence'
watch       = require 'gulp-watch'

dir = requireDir './tasks'

# Build tasks
gulp.task 'build', (done) ->
  runSequence ['copy', 'compile'], done

gulp.task 'build-production', (done) ->
  runSequence 'clean', ['build', 'minify'], 'lb-services', done

# Serve task
gulp.task 'webserver', ->
  connect.server
    livereload: true
    root: ['.', 'www']

gulp.task 'watch', ->
  gulp.watch "#{parameters.app_path}/**/*.coffee", ['coffee']
  gulp.watch "#{parameters.app_path}/*.jade", ['jade']
  gulp.watch "**/*.less", ['less']
  gulp.watch "#{parameters.app_path}/*/**/*.jade", ['templates']

  gulp.watch "#{parameters.assets_path}/*", ['assets']
  gulp.watch "bower_components/**/*.js", ['vendors']
  gulp.watch parameters.fonts.input_paths, ['fonts']

gulp.task 'livereload', ->
  gulp.src ["#{parameters.web_path}/*.css", "#{parameters.web_path}/*.js"]
  .pipe watch(["#{parameters.web_path}/*.css", "#{parameters.web_path}/*.js"])
  .pipe connect.reload()

gulp.task 'default', ['build', 'webserver', 'livereload', 'watch']
