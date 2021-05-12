const gulp = require("gulp"),
  sourcemaps = require("gulp-sourcemaps"),
  plumber = require("gulp-plumber"),
  webpack = require("webpack-stream"),
  rename = require("gulp-rename"),
  wait = require("gulp-wait"),
  replace = require("gulp-replace"),
  //   postcss = require("gulp-postcss"),
  //   flexBugs = require("postcss-flexbugs-fixes"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  sassInheritance = require("gulp-better-sass-inheritance"),
  multiDest = require("gulp-multi-dest");

var destOptions = {
  mode: "0777",
};

var CSS_SRC = [
  "!./src/styles/{vendor, outputs}/**/*",
  "./src/styles/**/*.scss",
];
var JS_SRC = ["src/scripts/**/*.js"];

/*=============================================================*/
/* TASKS */

function sassTask(done) {
  gulp
    .src(CSS_SRC)
    .pipe(wait(200))
    .pipe(
      sassInheritance({
        base: "src/styles/modules",
      })
    )
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer({ grid: true }))
    // .pipe(postcss([flexBugs]))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(multiDest(["dist/files/css"], destOptions));
  done();
}

function vendorCSS(done) {
  gulp
    .src("./dist/files/css/*.css")
    .pipe(replace(/\images\//g, ""))
    .pipe(gulp.dest("dist/files/vendor"));
  done();
}

// Esta tarea usa Webpack, porque permite hacer un bundle de los js y manejar jQuery sin hacer conflicto con la versión vieja de jQuery en VTex.
function scripts(done) {
  gulp
    .src(JS_SRC)
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(multiDest(["dist/files/js"], destOptions));
  done();
}

/*=============================================================*/
/* WATCH */
function watchFiles() {
  global.isWatching = true;
  gulp.watch(CSS_SRC, gulp.series(sassTask, vendorCSS));
}

/*=============================================================*/
/* DEFAULT TASK */

exports.default = gulp.parallel(watchFiles, scripts);
