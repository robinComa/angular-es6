var gulp = require('gulp');
var browserify = require('browserify');
var es6ify = require('es6ify');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./app/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./.tmp'));
});

gulp.task('es6', function () {
    return browserify([
        './app/index.js'
    ])
    .transform(es6ify)
    .bundle()
    .pipe(source('script.js'))
    .pipe(gulp.dest('./.tmp/'));
});

gulp.task('watch', function() {
    gulp.watch('app/style.scss').on('change', function(file) {
        gulp.run('sass');
    });
    gulp.watch('app/**/*.js').on('change', function(file) {
        gulp.run('es6');
    });
});
