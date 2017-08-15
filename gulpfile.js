'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    http = require('http'),
    st = require('st'),
    rename = require('gulp-rename'),
    handlebars = require('gulp-compile-handlebars'),
    cleanCSS = require('gulp-clean-css');

gulp.task('less', function() {
    return gulp.src('src/less/_main.less')
        .pipe(less())
        .pipe(rename('style.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('server', function(done) {
    http.createServer(
        st({ path: __dirname + '/dist', index: 'index.html', cache: false })
    ).listen(8080, done);
});

gulp.task('images', function() {
    return gulp.src(['src/img/**/*'])
        .pipe(gulp.dest('dist/img'));
})

gulp.task('scripts', function() {
    return gulp.src(['src/js/**/*'])
        .pipe(gulp.dest('dist/js'))
})

gulp.task('templates', function() {
    return gulp.src('src/*.hbs')
        .pipe(handlebars(null, {
            batch: ['src']
        }))
        .pipe(rename(function(path) {
            path.extname = ".html"
            return path;
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['server', 'less', 'templates', 'scripts', 'images'], function() {
    livereload({ start: true, basePath: 'dist' });
    gulp.watch('src/**/*.hbs', ['templates', livereload.reload])
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/img/**/*', ['images', livereload.reload]);
    gulp.watch('src/js/**/*', ['scripts', livereload.reload]);
});

gulp.task('build', ['server', 'less', 'templates', 'scripts', 'images']);