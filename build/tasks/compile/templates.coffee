gulp = require 'gulp'
parameters = require '../../parameters.coffee'

jade = require 'gulp-jade'
plumber = require 'gulp-plumber'
templateCache = require 'gulp-angular-templatecache'

# Compile teplates from Jade and inject them in Angular's template cache
# Only applies to files located in subfolders of app_path
# Jade files directly in the app_path directory are considered as main web pages and handled by `jade` task
gulp.task 'templates', ->
  gulp.src "#{parameters.app_path}/*/**/*.jade"
  .pipe plumber()
  .pipe jade doctype: 'html'
  .pipe templateCache
      filename: parameters.templates_file
      module: parameters.templates_module
      standalone: true
  .pipe gulp.dest "#{parameters.web_path}/js"
