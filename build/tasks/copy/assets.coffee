gulp = require 'gulp'
parameters = require '../../parameters.coffee'

# Copy assets to the served dir
gulp.task 'assets', ->
  gulp.src "#{parameters.assets_path}/**"
  .pipe gulp.dest parameters.web_path
