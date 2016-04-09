var concat = require('gulp-concat');
var filter = require('gulp-filter');
var gulp   = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');

var parameters = require('./parameters');

// JS vendors will be read from bower.json and concate
gulp.task('vendors', function() {
  var filterJS = filter('**/*.js', {restore: true});
  return gulp.src('./bower.json')
    .pipe(mainBowerFiles())
    .pipe(filterJS)
    .pipe(concat(parameters.vendor_main_file))
    .pipe(gulp.dest(`${parameters.web_path}/js`))
});

// CSS dependencies
gulp.task('css', function() {
  return gulp.src(parameters.css_files)
    .pipe(gulp.dest(`${parameters.web_path}/css`))
});

// Copy assets to the web path
gulp.task('assets', function() {
  return gulp.src(`${parameters.assets_path}/**`)
    .pipe(gulp.dest(parameters.web_path));
});

gulp.task('copy', ['assets', 'vendors', 'css']);
