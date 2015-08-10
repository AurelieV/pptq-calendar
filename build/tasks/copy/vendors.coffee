gulp = require 'gulp'
parameters = require '../../parameters.coffee'

mainBowerFiles = require 'main-bower-files'
concat = require 'gulp-concat'
filter = require 'gulp-filter'
rename = require 'gulp-rename'

# JS vendors will be read from bower.json order and concatenate into [web_path]/js/[vendor_main_file]
gulp.task 'vendors', ->
  gulp.src mainBowerFiles()
  .pipe filter '**/*.js'
  .pipe concat parameters.vendor_main_file
  .pipe gulp.dest "#{parameters.web_path}/js"
