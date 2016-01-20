gulp = require 'gulp'
parameters = require '../parameters.coffee'

ngAnnotate = require 'gulp-ng-annotate'
uglify = require 'gulp-uglify'

# Uglify CoffeScipt files to reduce their size
gulp.task 'minify', ['coffee', 'templates'], ->
  gulp.src "#{parameters.web_path}/**/*.js"
  .pipe ngAnnotate()
  .pipe uglify()
  .pipe gulp.dest parameters.web_path
