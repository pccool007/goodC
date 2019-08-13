var gulp     = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
minifycss    = require('gulp-uglifycss'),
sass         = require('gulp-sass'),
util         = require('gulp-util');

var config = {
  production: !!util.env.production,
};

gulp.task('css', function(){
  return gulp.src('./scss/style.scss')
    .pipe(sass())
    .on('error', consoleError)
    .pipe(autoprefixer('last 4 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(config.production ? minifycss() : util.noop())
    .pipe(gulp.dest('./css/'))
});

gulp.task('watch', ['css'], function(){
  gulp.watch('./scss/**/*.scss', ['css']);
});

function consoleError (error) {
  console.log(error.toString())
  this.emit('end')
}
