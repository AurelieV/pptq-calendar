gulp = require 'gulp'
path = require 'path'
parameters = require '../../parameters.coffee'

less = require 'gulp-less'
plumber = require 'gulp-plumber'
autoprefixer = require 'gulp-autoprefixer'

# Compile LESS files into CSS
gulp.task 'less', ->
  gulp.src parameters.less_main_file
  .pipe plumber()
  .pipe less paths: [ path.join(__dirname) ]
  .pipe autoprefixer
    browsers: ['last 2 versions', 'ie >= 8']
    cascade: false
  .pipe gulp.dest "#{parameters.web_path}/css"
