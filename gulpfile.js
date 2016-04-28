var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var notify = require("gulp-notify");

gulp.task('html', function() {
  gulp.src("./src/*.html")
  .pipe(gulp.dest("./dest/"))
});

gulp.task('image', function() {
  gulp.src("./src/img/*")
  .pipe(gulp.dest("./dest/img"))
  .pipe(reload({stream: true}));
});

gulp.task('js', function() {
  gulp.src("./src/js/*")
  .pipe(gulp.dest("./dest/js"))
});

gulp.task('lib', function() {
  gulp.src("./src/lib/*")
  .pipe(gulp.dest("./dest/lib"))
});

gulp.task('sass', function() {
  return gulp.src("./src/sass/style.scss")
    .pipe(sass())
	  .pipe(autoprefixer())
    .pipe(gulp.dest("./dest/css"))
    .pipe(reload({stream: true}));
});

gulp.task('font', function() {
  gulp.src("./src/fonts/*")
  .pipe(gulp.dest("./dest/fonts"))
});

gulp.task('serve', ['html','sass'], function() {

  browserSync.init({
    server: './dest/'
  });
  
  // gulp.watch("./src/img/*", ['image']);
  gulp.watch("./src/sass/*.scss", ['sass']);
  // gulp.watch("./src/js/**/*.js", ['js']);
  // gulp.watch("./src/lib/**/*", ['lib']);
  gulp.watch("./src/*.html", ['html']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);