'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const image = require('gulp-image');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

gulp.task('views', function buildHTML() {
    return gulp.src('src/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./public/'));
});

gulp.task('image', function () {
    gulp.src('./src/res/*')
      .pipe(image())
      .pipe(gulp.dest('./public/res'));
  });

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.series(['sass']));
    gulp.watch('./src/*.html', gulp.series(['template']));
});

gulp.task('serve', function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch("./src/scss/**/*.scss", gulp.series(['sass']));
    gulp.watch("./src/**/*.pug", gulp.series(['views'])).on('change', browserSync.reload);
    gulp.watch("./src/res/*", gulp.series(['image']));
});