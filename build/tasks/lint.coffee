gulp = require 'gulp'
parameters = require '../parameters.coffee'

coffeelint = require 'gulp-coffeelint'

# Lint CoffeeScript code and fails if uncompliant
gulp.task 'lint', ->
  gulp.src "#{parameters.app_path}/**/*.coffee"
  .pipe coffeelint 'coffeelint.json'
  .pipe coffeelint.reporter()
  .pipe coffeelint.reporter 'fail'

  gulp.src "#{parameters.server_path}/**/*.coffee"
  .pipe coffeelint 'coffeelint.json'
  .pipe coffeelint.reporter()
  .pipe coffeelint.reporter 'fail'
