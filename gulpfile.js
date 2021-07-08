// TODO: optional hash for files

// Dependencies
const gulp = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const sassGlob = require("gulp-sass-glob")
const sassVariables = require('gulp-sass-variables');
const autoprefixer = require("gulp-autoprefixer")
const sourcemaps = require("gulp-sourcemaps")
const babel = require("gulp-babel")
const concat = require("gulp-concat")
const imagemin = require("gulp-imagemin")
const nunjucks = require("gulp-nunjucks-render")
const del = require("del")
const htmlBeautify = require("gulp-html-beautify")
const gulpif = require("gulp-if")
const uglify = require("gulp-uglify")
const browserSync = require("browser-sync").create();
const { gulpfile, mode, font } = require("./config")

// Directories
const srcDir = (gulpfile && gulpfile.srcDir) || "./src"
const destDir = (gulpfile && gulpfile.destDir) || "./build"

// MINOR task for deleting destDir folder
function cleanTask() {
    return del([destDir])
}

// MINOR task for Javascript
function jsTask() {
    return gulp.src(srcDir + "/assets/scripts/**/*.js")
    .pipe(sourcemaps.init())
        .pipe(concat("index.js"))
        .pipe(gulpif((mode === "production") && (gulpfile && gulpfile.babel !== false), babel({
            presets: ["@babel/env"]
        })))
        .pipe(gulpif((mode === "production") && (gulpfile && gulpfile.uglify !== false), uglify()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destDir + "/assets/scripts"))
    .pipe(browserSync.stream())
}

// MINOR task for Images
function imageTask() {
    return gulp.src(srcDir + "/assets/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest(destDir + "/assets/images"))
    .pipe(browserSync.stream())
}

// MINOR task for CSS
function styleTask() {
    let fontWeightString = "";
    let fontFamilyString = font.family.split(" ").join("+");

    font.weight.forEach((item, index) => {
        if((font.weight).length !== (index + 1)) {
            fontWeightString = fontWeightString + item + ";"
        } else {
            fontWeightString = fontWeightString + item
        }
    })

    

    return gulp.src(srcDir + "/assets/styles/main.scss")
    .pipe(sassVariables({
        "$font--google": font.family,
        "$weight--google": font.weight,
        "$font--google-hash": fontFamilyString,
        "$weight--google-hash": fontWeightString,
    }))
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destDir + "/assets/styles"))
    .pipe(browserSync.stream())
}

// MINOR task for HTML views
function templateTask() {
    return gulp.src(srcDir + "/views/pages/**/*.html")
    .pipe(nunjucks({
        path: [srcDir + "/views"]
    }))
    .pipe(htmlBeautify())
    .pipe(gulp.dest(destDir))
    .pipe(browserSync.stream())
}

// MINOR task for wetching changes in files
function watchTask() {
    browserSync.init({
        server: {
            baseDir: destDir
        }
    })

    gulp.watch(srcDir + "/assets/scripts/**/*.js").on("change", jsTask)
    gulp.watch(srcDir + "/views/**/*.html").on("change", templateTask)
    gulp.watch(srcDir + "/assets/styles/**/*.scss").on("change", styleTask)
    gulp.watch(srcDir + "/assets/images/**/*").on("change", imageTask)
}

// Defining MAJOR tasks
const clean = gulp.series(cleanTask)
const build = gulp.series(cleanTask, gulp.parallel(imageTask, templateTask, styleTask, jsTask))
const watch = gulp.series(watchTask)

// Exporting MAJOR tasks
exports.watch = watch
exports.build = build
exports.default = build
exports.clean = clean