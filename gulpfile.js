var gulp = require("gulp");
var gulpUtil = require("gulp-util");

var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var tslint = require("gulp-tslint");
var watchify = require("watchify");

var exec = require("child_process").exec;

var paths = {
  pages: ['index.html']
};

var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['ts/app.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));

gulp.task("init", function() {
  gulp.watch("index.html", ["copy-html"]);  
});

gulp.task("copy-html", function () {
  return gulp.src(paths.pages)
    .pipe(gulp.dest("dist"));
});

gulp.task("lint", ["lint:ts"]);

gulp.task("lint:ts", function() {
  return gulp.src(["ts/**/*.ts"])
    .pipe(tslint({
      rulesDirectory: "node_modules/tslint-microsoft-contrib",
      formatter: "verbose"
    }))
    .pipe(tslint.report({ summarizeFailureOutput: false }));
});

var bundle = function() {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"))
    .on("end", function() {
      exec("node devServer");
      console.log("app is running on port 8083");
    });
};

gulp.task("default", ["copy-html", "init"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gulpUtil.log);