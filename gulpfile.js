var config = {
  sassLang: 'libsass',
  sourcemaps: 'sourcemaps',
  sass: 'src/*.scss',
  dest: 'dist',
  browserSync: {
    server: {
      baseDir: './'
    },
    port: '3000',
    open: true,
    notify: false
  },

  watch: {
    testcafe: 'src/tiny-slider.native.js, tests/tests.js',
    html: ['tests/*.html', 'tests/**/*.css']
  },

  js: {
    src: 'src/*.js',
    name: 'animate.js',
    options: {
      // mangle: false,
      output: {
        quote_keys: true,
      },
      compress: {
        properties: false,
      }
    },
  },

  testcafe: {
    src: 'tests/tests.js',
    options: { browsers: ['chrome', 'safari'] },
  }
};

var gulp = require('gulp');
var php = require('gulp-connect-php');
var libsass = require('gulp-sass');
var rubysass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var modernizr = require('gulp-modernizr');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var path = require('path');
var svgmin = require('gulp-svgmin');
var svg2png = require('gulp-svg2png');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var mergeStream = require('merge-stream');
// var testcafe = require('gulp-testcafe');

function errorlog (error) {  
  console.error.bind(error);  
  this.emit('end');  
}  

// SASS Task
if (config.sassLang === 'libsass') {
  gulp.task('sass', function () {  
    return gulp.src(config.sass)  
        .pipe(sourcemaps.init())
        .pipe(libsass(config.libsass_options).on('error', libsass.logError))  
        .pipe(sourcemaps.write(config.sourcemaps))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.stream());
  });  
} else {
  gulp.task('sass', function () {  
    return rubysass(config.sass, config.rubysass_options)  
        .pipe(sourcemaps.init())
        .on('error', rubysass.logError)  
        .pipe(sourcemaps.write(config.sourcemaps))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.stream());
  });  
}

// JS Task  
gulp.task('js', function () {  
  return gulp.src(config.js.src)
      .pipe(sourcemaps.init())
      .pipe(concat(config.js.name))
      .on('error', errorlog)  
      .pipe(gulp.dest(config.dest))
      .pipe(uglify())
      .pipe(sourcemaps.write('../' + config.sourcemaps))
      .pipe(gulp.dest(config.dest + '/min'))
      .pipe(browserSync.stream());
});

// testcafe
// gulp.task('testcafe', () => {
//   return gulp.src(config.testcafe.src)
//     .pipe(testcafe(config.testcafe.options));
// });

// browser-sync
gulp.task('sync', function() {
  browserSync.init(config.browserSync);
});

// Watch
gulp.task('watch', function () {
  // gulp.watch(config.sass, ['sass']);
  gulp.watch(config.js.src, ['js']).on('change', browserSync.reload);
  // gulp.watch(config.watch.testcafe, ['testcafe']);
  gulp.watch(config.watch.html).on('change', browserSync.reload);
});

// Default Task
gulp.task('default', [
  // 'sass',
  // 'js',
  'sync', 
  'watch', 
]);  