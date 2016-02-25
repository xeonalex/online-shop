'use strict';
var gulp=require("gulp"),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'), // замінює обробник onerror на подію error (тобто не вибиває процес) потрібно добавляти
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    compass = require('gulp-compass'),
    wiredep = require('wiredep').stream;

var paths = {
	'jade_watch':['./app/jade-files/*/*.jade', './app/jade-files/*.jade'],
	'jade' : './app/jade-files/*.jade',
    'sass_watch':['./app/sass/*/*.scss', './app/sass/*.scss'],
    'sass':'./app/sass/main.scss',
    'htmlDest': './app/ProjectPath/',
    'cssDest': './app/css/',
    'html': './app/ProjectPath/*.html',
    'sprites': './app/sass/sprite-items.scss'
}

gulp.task('compass', function() {
  gulp.src(paths.sass)
    .pipe(plumber({
        errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
    .pipe(compass({
      config_file: './config.rb',
      css: 'app/css',
      sass: 'app/sass'
    }))
    .on('error', function(error) {
      // Would like to catch the error here
      console.log(error);
    })
    .pipe(gulp.dest(paths.cssDest))
});


gulp.task('gulpCompiling', function() {
    var YOUR_LOCALS = {}; // JSON для файлів по необхідності

  gulp.src(paths.jade)
    .pipe(plumber()) // добавляеться після всіх src де ми не використовуємо onerror handler
    .pipe(jade({
    	pretty: '\t'
    	}))
    .pipe(gulp.dest(paths.htmlDest))
});


// gulp.task('sassCompiling', function () {
//   return gulp.src(paths.sass,{sourcemap: true, style: 'compact'})
//     .pipe(plumber())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./app/css'))
//     .pipe(autoprefixer({
//         browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
//         }));
// });

gulp.task('bower:links', function () {
  gulp.src(paths.html)
    .pipe(wiredep({
      directory: "./app/bower"
    }))
    .pipe(gulp.dest(paths.htmlDest));
});

gulp.task('gulp:watch', function(){
	gulp.watch(paths.jade_watch,['gulpCompiling'])
  gulp.watch(paths.html,['bower:links'])
});
gulp.task('sass:watch', function () {
  //gulp.watch(paths.sass_watch, ['sassCompiling']);
  gulp.watch(paths.sass_watch, ['compass']);
});

gulp.task('default', ['sass:watch','gulp:watch']);