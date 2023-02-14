'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	prefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	jpegoptim = require('imagemin-jpegoptim'),
	browserSync = require("browser-sync"),
	rigger = require('gulp-rigger'),
	pug = require('gulp-pug'),
	reload = browserSync.reload;


// Пути
var path = {
	dist:{
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/img/',
		fonts: 'dist/fonts/'
	},
	src:{
		pug: 'src/templates/**/*.pug',
		pages: 'src/templates/pages/*.pug',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch:{
		html: 'src/templates/**/*.pug',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
};


// Собираем HTML
// gulp.task('htmlDist', function () {
// 	return gulp.src(path.src.html)
// 		.pipe(rigger())
// 		.pipe(gulp.dest(path.dist.html))
// 		.pipe(reload({stream: true}));
// });

// Pug -> HTML
gulp.task('pugDist', function buildHTML() {
	return gulp.src(path.src.pages)
		.pipe(pug({
			pretty: true
		}))
    //.pipe(formatHtml())
    // .pipe(diffableHtml())
		.pipe(gulp.dest(path.dist.html))
    	.pipe(reload({stream: true}));
});


// SCSS -> CSS
gulp.task('styleDist', function () {
	return gulp.src("src/style/main.scss")  
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(prefixer({
			browsers: ['last 3 versions', 'ie >= 10']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.dist.css))
		.pipe(reload({stream: true}));
});


// Перенос css библиотек
gulp.task('libsDist', function () {
	return gulp.src("src/style/add/*.css")
		.pipe(gulp.dest(path.dist.css))
});


// Собираем КАРТИНКИ
gulp.task('imageDist', function(){
	return gulp.src(path.src.img)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			jpegoptim({
				progressive: true,
				stripAll: true,
					max: 85
				}),
				pngquant(),
					imagemin.svgo({
						plugins: [
							{removeViewBox: true},
							{cleanupIDs: false}
						]
					})
				], {
					verbose: true
				}))
		.pipe(gulp.dest(path.dist.img));
});


// Перенос шрифтов
gulp.task('fontsDist', function() {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.dist.fonts))
});


// Перенос JS
gulp.task('jsDist', function () {
	return gulp.src(path.src.js)
		.pipe(gulp.dest(path.dist.js))
});


// Сервер
gulp.task('server', function(){
	browserSync({
		server:{
			baseDir: "./dist"
		},
		host: 'localhost',
		port: 7777,
		notify: false
	});
});


// Watch
gulp.task('watch', function(){
	//gulp.watch([path.watch.html], gulp.parallel('htmlDist'));
	gulp.watch([path.src.pug], gulp.parallel('pugDist'));
	gulp.watch([path.watch.fonts], gulp.parallel('fontsDist'));
	gulp.watch([path.watch.img], gulp.parallel('imageDist'));
	gulp.watch([path.watch.js], gulp.parallel('jsDist'));
	gulp.watch([path.watch.style], gulp.parallel('styleDist'));
	gulp.watch("src/style/add/*.css", gulp.parallel('libsDist'));
});


// Запуск gulp
gulp.task('default', gulp.parallel('server', 'watch'));