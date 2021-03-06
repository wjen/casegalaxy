//initialize gulp
var gulp        = require('gulp'),
    //run sequence used to prevent main task from running while depencies are running
    runSequence = require('run-sequence'),
    del         = require('del'),
    inject      = require('gulp-inject'),
    serve       = require('gulp-serve'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify');


var files = require('./gulp/gulp.config.js');

//default task
gulp.task('default', function(callback) {
  runSequence('build', 'watch', callback);
});

gulp.task('build', function(callback) {
  runSequence('clean', 'scripts', 'styles', 'copy-build', 'index', callback);
});

gulp.task('serve', serve('build'));

gulp.task('index', function(){
  return gulp.src('./public/index.html')
    .pipe(inject(gulp.src(files.app_files.tpl_src), {ignorePath: 'build'}))
    .pipe(gulp.dest(files.build_dir));
});

gulp.task('clean', function(){
  //return the promise
  return del([files.build_dir], {force: true})
});

gulp.task('copy-build', ['copy-html', 'copy-json', 'copy-assets', 'copy-app-js', 'copy-vendor-js']);

gulp.task('copy-html', function () {
  return gulp.src(['./public/**/*.html', '!./public/index.html'])
    .pipe(gulp.dest(files.build_dir));
});

gulp.task('copy-json', function () {
  return gulp.src('./public/**/*.json')
    .pipe(gulp.dest(files.build_dir));
});

gulp.task('copy-assets', function(){
  return gulp.src('./public/assets/**/*')
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('copy-app-js', function(){
  return gulp.src('./public/**/*.js')
    .pipe(gulp.dest(files.build_dir));
});

gulp.task('copy-vendor-js', function(){
  return gulp.src('./vendor/**/*.js')
    .pipe(gulp.dest('./build/vendor'));
});

gulp.task('lint', function(){
  return gulp.src(files.app_files.js_css)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function(){
  gulp.watch(files.app_files.js_css, ['lint', 'build']);
});


// gulp concat to add all files in a single file for js and css in the build
gulp.task('scripts', function() {
    return gulp.src([
      './public/js/app.js',
      './public/js/app.routes.js',
      './public/controllers/**/*.js',
      './public/services/**/*.js',
      './public/bower_components/ngCart/dist/ngCart.js'
    ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('styles', ['scripts'], function() {
    return gulp.src([
        './public/assets/**/*'
    ])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('build/assets/css'));
});


