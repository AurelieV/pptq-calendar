gulp = require 'gulp'
parameters = require '../parameters.coffee'

vinylPaths    = require 'vinyl-paths'
del           = require 'del'

# Clean the served directory
gulp.task 'clean', ->
  gulp.src parameters.web_path
  .pipe vinylPaths(del)
