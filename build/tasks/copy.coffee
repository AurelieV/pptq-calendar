gulp = require 'gulp'
parameters = require '../parameters.coffee'

requireDir = require 'require-dir'
dir = requireDir './copy'

# Tasks concatening and copying files (without compilation)
gulp.task 'copy', ['assets', 'vendors']
