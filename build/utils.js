var del        = require('del');
var gulp       = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify     = require('gulp-uglify');

var parameters = require('./parameters');

gulp.task('watch', function() {
  gulp.watch(`${parameters.app_path}/*.jade`, ['jade']);
  gulp.watch(`${parameters.app_path}/*/**/*.jade`, ['templates']);
  gulp.watch('**/*.scss', ['sass']);
  gulp.watch(`${parameters.assets_path}/**/*`, ['assets']);
  gulp.watch('bower_components/**/*.js', ['vendors']);
  gulp.watch(`${parameters.app_path}/**/*.js`, ['babel']);
});

// Clean the web path
gulp.task('clean', function() {
  return del(`${parameters.web_path}/**/*`)
});

// Uglify js script
// @TODO: à reréfléchir
gulp.task('minify', function() {
  return gulp.src(`${parameters.web_path}/**/*.js`)
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(parameters.web_path))
});

