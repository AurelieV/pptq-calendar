gulp = require 'gulp'
parameters = require '../../parameters.coffee'

jade = require 'gulp-jade'
plumber = require 'gulp-plumber'

# Compile webpages from Jade to HTML
# Only applies to files located on the app_path folder
# Jade files in subdirectories are considered as templates
gulp.task 'jade', ->
  gulp.src "#{parameters.app_path}/*.jade"
  .pipe plumber()
  .pipe jade pretty: true
  .pipe gulp.dest parameters.web_path
