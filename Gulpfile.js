var gulp         = require('gulp');
var gutil        = require("gulp-util");
var sass         = require('gulp-sass');
var jshint       = require('gulp-jshint');
var uglify       = require('gulp-uglifyjs');
var rename       = require('gulp-rename');
var replace      = require("gulp-replace");
var concat       = require('gulp-concat');
var notify       = require('gulp-notify');
var header       = require('gulp-header');
var minifycss    = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var clean        = require("gulp-clean");
//var jsdoc        = require("gulp-jsdoc");
//var jsdoc2md     = require("gulp-jsdoc-to-markdown");
var fs           = require("fs");
var pkg          = require('./package.json');
var dateFormat   = require('dateformatter').format;
var bowerPath    = "./bower_components/";

pkg.name         = "PlaneUI";
pkg.today        = dateFormat;

var headerComment = ["/*!", 
					" * <%= pkg.name %> v<%= pkg.version %>",
					" * @file        <%= fileName(file) %> ",
					" * @description <%= pkg.description %>",
					" * @license     MIT License",
					" * @author      <%= pkg.author %>",
					" * {@link       <%= pkg.homepage %>}",
					" * @updateTime  <%= pkg.today('Y-m-d') %>",
					" */", 
					"\r\n"].join("\r\n");

var headerCommentInline = "/*! <%= pkg.name %> v<%= pkg.version %> | <%= fileName(file) %> | <%= pkg.description %> | MIT License | By: <%= pkg.author %> | <%= pkg.homepage %> | <%=pkg.today('Y-m-d') %> */\n";

gulp.task('scss', function() { 
    var src = [
        'src/scss/planeui.scss',
        'src/scss/planeui.logo.scss',
        'src/scss/planeui.basic.scss'
    ];

	return gulp.src(src)
			   .pipe(sass({ outputStyle: 'expanded', sourcemap: false }))   //nested,compact,expanded,compressed
			   //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
			   .pipe(gulp.dest('dist/css')) 
			   .pipe(rename({ suffix: '.min' }))
			   .pipe(gulp.dest('dist/css'))
			   .pipe(minifycss())
			   .pipe(gulp.dest('dist/css')) 
			   .pipe(notify({ message: 'Scss task completed!' }));
}); 

gulp.task("js-concat", function() { 
  return gulp.src(['!src/js/module.js', '!src/js/fullpage.js', 'src/js/*.js', bowerPath + "modernizr/modernizr.js"])
    .pipe(concat('planeui.js'))
    .pipe(gulp.dest('dist/js')) 
    .pipe(notify({ message: 'JS concat task complete' }));
}); 

gulp.task("js-amd", ["js-concat"], function() { 
  return gulp.src("src/js/module.js")
    .pipe(replace("// PlaneUI", fs.readFileSync("dist/js/planeui.js", "utf-8")))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ basename : "planeui" }))
    .pipe(gulp.dest('dist/js'))
	.pipe(header(headerComment, {pkg : pkg, fileName : function(file) { 
		var name = file.path.split(file.base);
		return name[1].replace("\\", "");
	}}))
	.pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))	
	.pipe(header(headerCommentInline, {pkg : pkg, fileName : function(file) {
		var name = file.path.split(file.base + "\\");
		return name[1];
	}}))
	.pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'planeui.js task complete' }));
}); 

gulp.task("plugins", function() { 
  return gulp.src("src/plugins/**/*")
    .pipe(gulp.dest("dist/plugins")) 
    .pipe(notify({ message: "Plugins task complete!" }));
}); 

// IE patch files
// Polyfills
gulp.task("ie9lte", function() {
    var src = [
        bowerPath + "selectivizr/selectivizr.js",
        bowerPath + "html5shiv/dist/html5shiv-printshiv.js",
        bowerPath + "respond/dest/respond.matchmedia.addListener.src.js"
    ];

    return gulp.src(src)
                .pipe(concat("planeui.patch.ie8.js"))
                .pipe(header(headerComment, {pkg : pkg, fileName : function(file) { 
                    var name = file.path.split(file.base);
                    return name[1];
                }}))
                .pipe(gulp.dest("dist/js"))
                .pipe(rename({ suffix: '.min' }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/js'))	
                .pipe(header(headerCommentInline, {pkg : pkg, fileName : function(file) {
                    var name = file.path.split(file.base + "\\");
                    return name[1];
                }}))
                .pipe(gulp.dest('dist/js'))
                .pipe(notify({ message: "IE Patch task complete" }));
});

gulp.task("ie9patch", function() {
    var src = [
        bowerPath + "doctype-flexie/src/flexie.js",
        "./src/js/iepatch/iepatch.js"
    ];

    return gulp.src(src)
                .pipe(concat("planeui.patch.ie9.js"))
                .pipe(header(headerComment, {pkg : pkg, fileName : function(file) { 
                    var name = file.path.split(file.base);
                    return name[1];
                }}))
                .pipe(gulp.dest("dist/js"))
                .pipe(rename({ suffix: '.min' }))
                .pipe(uglify())
                .pipe(gulp.dest('dist/js'))	
                .pipe(header(headerCommentInline, {pkg : pkg, fileName : function(file) {
                    var name = file.path.split(file.base + "\\");
                    return name[1];
                }}))
                .pipe(gulp.dest('dist/js'))
                .pipe(notify({ message: "IE Patch task complete" }));
});

gulp.task("js", ["js-amd"], function() {
    return gulp.src("dist/js/module.js").pipe(clean()).pipe(notify({ message: 'js task complete!' }));
});

gulp.task("jsall", ["js-amd", "ie9lte", "ie9patch", "plugins"], function() {
    return gulp.src("dist/js/module.js").pipe(clean()).pipe(notify({ message: 'jsall task complete!' }));
});

gulp.task("fonts", function(){
    return gulp.src([bowerPath + "fontawesome/fonts/*"])
                .pipe(gulp.dest('dist/fonts'));
});

// CSS deps
gulp.task("cssdeps", function() {
    var src = [
        bowerPath + "normalize.css/normalize.css",
        bowerPath + "fontawesome/css/font-awesome.css",
        bowerPath + "prefixes.scss/dist/prefixes.scss"
    ];

    return gulp.src(src)
               .pipe(rename({extname: ".scss"}))
               .pipe(gulp.dest("src/scss/third-party"))    
               .pipe(notify({ message: "Dev deps css task complete" }));
});

gulp.task("dev", ["fonts", "cssdeps"]);

/*gulp.task("jsdoc", function(){
    return gulp.src(["./src/*.js", "README.md"])
               .pipe(jsdoc.parser())
               .pipe(jsdoc.generator('./docs/html'));
});

gulp.task("jsdoc2md", function(){
    return gulp.src("src/*.js")
        .pipe(jsdoc2md())
        .on("error", function(err){
            gutil.log(gutil.colors.red("jsdoc2md failed"), err.message)
        })
        .pipe(rename(function(path) {
            path.extname = ".md";
        }))
        .pipe(gulp.dest("docs/markdown"));
});*/

gulp.task('watch', function() { 
	gulp.watch('src/scss/**/*.scss', ['scss']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('./src/js/iepatch/iepatch.js', ['ie']);
});

gulp.task('default', function() {
	//gutil.log(gutil);
	//gutil.log(gutil.colors.green("default task starting....."));

    //gulp.run('scss');
    /*
    gulp.watch('./src/js/*.js',function() {
        gulp.run('js');
    });

    gulp.watch('./src/scss/*.scss',function() {
        gulp.run('scss');
    });*/
});