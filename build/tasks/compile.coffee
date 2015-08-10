gulp = require 'gulp'
parameters = require '../parameters.coffee'

requireDir = require 'require-dir'
dir = requireDir './compile'

# Tasks concatening and compiling files
gulp.task 'compile', ['coffee', 'templates', 'jade', 'less']
