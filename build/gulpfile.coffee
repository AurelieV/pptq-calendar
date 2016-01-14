gulp        = require 'gulp'
parameters  = require './parameters.coffee'
requireDir  = require 'require-dir'
runSequence = require 'run-sequence'
watch       = require 'gulp-watch'

dir = requireDir './tasks'

# Build tasks
gulp.task 'build', (done) ->
  runSequence ['copy', 'compile'], done

gulp.task 'build-production', (done) ->
  runSequence 'clean', ['build', 'minify'], done

gulp.task 'watch', ->
  gulp.watch "#{parameters.app_path}/**/*.coffee", ['coffee']
  gulp.watch "#{parameters.app_path}/*.jade", ['jade']
  gulp.watch "**/*.less", ['less']
  gulp.watch "#{parameters.app_path}/*/**/*.jade", ['templates']

  gulp.watch "#{parameters.assets_path}/*", ['assets']
  gulp.watch "bower_components/**/*.js", ['vendors']
  gulp.watch parameters.fonts.input_paths, ['fonts']

gulp.task 'default', ['build', 'watch']
