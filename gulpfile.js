var gulp        = require('gulp');
var requireDir  = require('require-dir');
var runSequence = require('run-sequence');

var parameters  = require('./build/parameters');
requireDir('./build');

// Build tasks
gulp.task('build', function(done) {
  runSequence(['copy', 'compile'], done);
});

gulp.task('build-prod', function(done) {
  runSequence('clean', 'build', 'minify', done);
});

gulp.task('default', function() {
  runSequence('build', 'watch');
});
