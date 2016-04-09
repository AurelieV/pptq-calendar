var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var gulp  = require('gulp');
var jade  = require('gulp-jade');
var sass = require('gulp-sass');
var path = require('path');
var replace = require('gulp-replace');
var templateCache = require('gulp-angular-templatecache');

var parameters = require('./parameters');

// Compile CoffeeScript files to JS
gulp.task('babel', function() {
  // `module.coffee` files are treated before others so all the modules are declared before being used
  var jsFiles = [
    `${parameters.app_path}/*.js`,
    `${parameters.app_path}/**/module.js`,
    `${parameters.app_path}/**/*.js`,
    `!${parameters.assets_path}{,/**}`
  ];
  return gulp.src(jsFiles)
    .pipe(babel())
    .pipe(concat(parameters.app_main_file))
    .pipe(gulp.dest(`${parameters.web_path}/js`));
});

// Compile webpages from Jade to HTML
// Only applies to files located on the app_path folder
// Jade files in subdirectories are considered as templates
gulp.task('jade', function() {
  return gulp.src(`${parameters.app_path}/*.jade`)
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(parameters.web_path));
});

// Compile templates from Jade and inject them in Angular's template cache
// Only applies to files located in subfolders of app_path
// Jade files directly in the app_path directory are considered as main web pages and handled by `jade` task
gulp.task('templates', function() {
  return gulp.src(`${parameters.app_path}/*/**/*.jade`)
    .pipe(jade())
    .pipe(templateCache({
      filename: parameters.templates_file,
      module: parameters.templates_module,
      standalone: true
    }))
    .pipe(gulp.dest(`${parameters.web_path}/js`));
});

// Compile scss files into CSS
gulp.task('sass', function () {
  return gulp.src(parameters.sass_main_file)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 8'],
      cascade: false
    }))
    .pipe(gulp.dest(`${parameters.web_path}/css`))
});

gulp.task('compile', ['babel', 'templates', 'jade', 'sass']);
