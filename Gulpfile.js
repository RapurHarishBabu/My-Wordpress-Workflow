/*==================================================
=            All Gulp Plugins Variables            =
==================================================*/
var gulp			= require('gulp'),
	htmlmin 		= require('gulp-htmlmin'),
	del 			= require('del'),
	jade 			= require('gulp-jade'),
	pngquant 		= require('imagemin-pngquant'),
	jadephp 		= require('gulp-jade-php'),
	copy 			= require('gulp-copy'),
	sass			= require('gulp-sass'),
	scss			= require('gulp-scss'),
	csso 			= require('gulp-csso'),
	watch			= require('gulp-watch'),
	merge 			= require('merge-stream'),
	jquery 			= require('gulp-jquery'),
	uglify 			= require('gulp-uglify'),
	imagemin 		= require('gulp-imagemin'),
	rename 			= require('gulp-rename'),
	browserSync 	= require('browser-sync'),
	plumber			= require('gulp-plumber'),
	spritesmith 	= require("gulp.spritesmith"),
	svgSprite       = require('gulp-svg-sprite'),
	livereload 		= require('gulp-livereload'),
	autoprefixer 	= require('gulp-autoprefixer');



/*================================
=            Del Task            =
================================*/
gulp.task('del', function() {
	del(['Fonts','Images','Styles','Scripts','*.php','*.html','*.css']).then(function (paths) {
	    console.log('Deleted files/folders:\n', paths.join('\n'));
	});
});
/*=====  End of Del Task  ======*/



/*==================================
=            Style Task            =
==================================*/
/* Sass Task*/
gulp.task('styles', function() {
	gulp.src('./$Dev/styles/*.sass')
		.pipe(plumber())
		.pipe(sass({
			// outputStyle: 'expended'
		}))
		.pipe(autoprefixer({
            browsers: [
				'ie >= 10',
				'ie_mob >= 10',
				'ff >= 30',
				'chrome >= 34',
				'safari >= 7',
				'opera >= 23',
				'ios >= 7',
				'android >= 4.4',
				'bb >= 10'
			],
            	cascade: false
        }))
        .pipe(csso())	/* Css3 Optimizer */
        .pipe(plumber.stop())
		.pipe(gulp.dest('./Styles/'))
     	.pipe(livereload({ start: true }));

/* Scss Task */
	gulp.src('./$Dev/*.scss')
		.pipe(plumber())
		.pipe(scss())
		.pipe(autoprefixer({
            browsers: [
				'ie >= 10',
				'ie_mob >= 10',
				'ff >= 30',
				'chrome >= 34',
				'safari >= 7',
				'opera >= 23',
				'ios >= 7',
				'android >= 4.4',
				'bb >= 10'
			],
            cascade: false
        }))
        .pipe(csso())	/*Optimizer */
        .pipe(plumber.stop())
		.pipe(gulp.dest('./'))
     	.pipe(livereload({ start: true }));
});
/*=====  End of Style Task  ======*/



/*=====================================
=            Template Task            =
=====================================*/
/* PHP Task */
gulp.task('jadephp', function() {
	gulp.src('./$Dev/*.jade')
		.pipe(plumber())
		.pipe(jadephp({
			pretty: true
		}))
		// .pipe(htmlmin({collapseWhitespace: true,removeComments: true}))	/* Optimizer */
		.pipe(plumber.stop())
		.pipe(gulp.dest('./'))
		.pipe(livereload({ start: true }));
});

/* HTML5 Task*/
gulp.task('jade', function() {
	var YOUR_LOCALS = {};

	gulp.src('./$Dev/*.jade')
		.pipe(plumber())
		.pipe(jade({
			locals: YOUR_LOCALS,
			pretty: true
		}))
		// .pipe(htmlmin({collapseWhitespace: true,removeComments: true,removeCommentsFromCDATA: true}))	/* Optimizer */
		.pipe(plumber.stop())
		.pipe(gulp.dest('./'))
		.pipe(livereload({ start: true }));
});
/*=====  End of Template Task  ======*/



/*===================================
=            Sprite Task            =
===================================*/
gulp.task('sprite', function () {
	var spriteData = gulp.src('./$Dev/Images/Sprite/*.png')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.css'
		}));
		var imgStream = spriteData.img
		.pipe(imagemin())
		.pipe(gulp.dest('./Images/Sprite')); 
		var cssStream = spriteData.css
        // .pipe(csso()) /* Css3 Optimizer */
		.pipe(gulp.dest('./Images/Sprite'));
		return merge(imgStream, cssStream);
});
/*=====  End of Sprite Task  ======*/



/*===================================
=            Jquery Task            =
===================================*/
gulp.task('jquery', function () {
    return jquery.src({
        release: 2, //jQuery 2 
        flags: ['-deprecated', '-event/alias', '-ajax/script', '-ajax/jsonp', '-exports/global']
    })
    .pipe(gulp.dest('./$Dev/Scripts/'));
    // creates ./public/vendor/jquery.custom.js 
});
/*=====  End of Jquery Task  ======*/



/*=================================
=            Copy Task            =
=================================*/
gulp.task('copy', function() {
/* Fonts */
	gulp.src('./$Dev/fonts/**/*.*')
		.pipe(gulp.dest('./Fonts'));

/* Scripts */
	gulp.src('./$Dev/scripts/**/*.*')
		.pipe(gulp.dest('./Scripts'));
});
/*=====  End of Copy Task  ======*/



/*==================================
=            Image Task            =
==================================*/
gulp.task('images', function () {
    return gulp.src('./$dev/Images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./Images'));
});
/*=====  End of Image Task  ======*/



/*=======================================
=            BrowserSYN Task            =
=======================================*/
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});
/*=====  End of BrowserSYN Task  ======*/



/*==================================
=            Watch Task            =
==================================*/
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('$Dev/styles/**/*.sass', ['styles']);
	gulp.watch('$Dev/*.scss', ['styles']);
	gulp.watch('$Dev/*.jade', ['jade']);
	gulp.watch('$Dev/*.jade', ['jadephp']);
	gulp.watch('$Dev/fonts/**/*.*', ['copy']);
	gulp.watch('$Dev/scripts/**/*.*', ['copy']);
	gulp.watch('$Dev/images/*.*', ['images']);
});
/*=====  End of Watch Task  ======*/



/*====================================
=            Default Task            =
====================================*/
gulp.task('default', [
	'del',
	'styles',
	// 'jade',
	'jadephp',
	'jquery',
	'copy',
	'images',
	// 'browser-sync',
	'watch'
]);
/*=====  End of Default Task  ======*/