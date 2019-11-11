const gulpfile = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const rename = require("gulp-rename");

function styles() {

    return(
        gulpfile.src("css/*.scss")
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write("."))
            .pipe(gulpfile.dest("css"))
    );

}
function js() {
    return(
        gulpfile.src(["js/*.js", "!js/*.min.js"])
            .pipe(terser())
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulpfile.dest("js"))
    );
}

function watch(){
    gulpfile.watch("css/*.scss", styles);
    gulpfile.watch(["js/*.js", "!js/*.min.js"], js)
}

const build = gulpfile.parallel(styles, js);

exports.styles = styles;
exports.js = js;
exports.watch = watch;
exports.build = build;