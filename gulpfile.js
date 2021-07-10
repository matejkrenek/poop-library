// TODO: optional hash for files
// TODO: multiple gulp files
// TODO: concat es6 imports and exports

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
const rename = require("gulp-rename")
const browserSync = require("browser-sync").create();
const config = require("./config.json")

// Directories
const srcDir = (config.gulp && config.gulp.src) || "./src"
const destDir = (config.gulp && config.gulp.dest) || "./build"

// MINOR task for deleting destDir folder
function cleanTask() {
    return del([config.gulp.dest])
}

// MINOR task for Javascript
function javascriptGlobal() {
    return gulp.src(config.gulp.src + "/assets/scripts/**/*.js")
    .pipe(sourcemaps.init())
        .pipe(concat("index.js"))
        .pipe(gulpif((config.mode === "production") && (config.gulp && config.gulp.settings.babel !== false), babel({
            presets: ["@babel/env"]
        })))
        .pipe(gulpif((config.mode === "production") && (config.gulp && config.gulp.settings.uglify !== false), uglify()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.gulp.dest + "/assets/scripts"))
    .pipe(browserSync.stream())
}

function javascriptPoopLibrary() {
    return gulp.src(config.gulp.src + "/poop-lib/assets/scripts/**/*.js")
    .pipe(sourcemaps.init())
        .pipe(concat("poop-lib.js"))
        .pipe(gulpif((config.mode === "production") && (config.gulp && config.gulp.settings.babel !== false), babel({
            presets: ["@babel/env"]
        })))
        .pipe(gulpif((config.mode === "production") && (config.gulp && config.gulp.settings.uglify !== false), uglify()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.gulp.dest + "/assets/scripts"))
    .pipe(browserSync.stream())
}

// MINOR task for Images
function imageGlobal() {
    return gulp.src(config.gulp.src + "/assets/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest(config.gulp.dest + "/assets/images"))
    .pipe(browserSync.stream())
}

function imagePoopLibrary() {
    return gulp.src(config.gulp.src + "/poop-lib/assets/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest(config.gulp.dest + "/assets/images/poop-lib"))
    .pipe(browserSync.stream())
}

// MINOR task for CSS
function styleGlobal() {
    let fontWeightString = "";
    let fontFamilyString = config.font.family.split(" ").join("+");

    config.font.weight.forEach((item, index) => {
        if(( config.font.weight).length !== (index + 1)) {
            fontWeightString = fontWeightString + item + ";"
        } else {
            fontWeightString = fontWeightString + item
        }
    })

    

    return gulp.src(config.gulp.src + "/assets/styles/main.scss")
    .pipe(sassVariables({
        "$font--google":  config.font.family,
        "$weight--google":  config.font.weight,
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
    .pipe(gulp.dest(config.gulp.dest + "/assets/styles"))
    .pipe(browserSync.stream())
}

function stylePoopLibrary() {
    let fontWeightString = "";
    let fontFamilyString = config.font.family.split(" ").join("+");

    config.font.weight.forEach((item, index) => {
        if((config.font.weight).length !== (index + 1)) {
            fontWeightString = fontWeightString + item + ";"
        } else {
            fontWeightString = fontWeightString + item
        }
    })


    return gulp.src(config.gulp.src + "/poop-lib/assets/styles/main.scss")
    .pipe(sassVariables({
        "$font--google":config. font.family,
        "$weight--google": config.font.weight,
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
    .pipe(rename("poop-lib.css"))
    .pipe(gulp.dest(config.gulp.dest + "/assets/styles"))
    .pipe(browserSync.stream())
}

// MINOR task for HTML views
function templateTask() {
    return gulp.src(config.gulp.src + "/views/pages/**/*.html")
    .pipe(nunjucks({
        path: [srcDir + "/views"]
    }))
    .pipe(htmlBeautify())
    .pipe(gulp.dest(config.gulp.dest))
    .pipe(browserSync.stream())
}

// MINOR task for wetching changes in files
function watchTask() {
    browserSync.init({
        server: {
            baseDir: config.gulp.dest
        }
    })

    gulp.watch(config.gulp.src + "/**/assets/scripts/**/*.js").on("change", gulp.parallel(javascriptGlobal, javascriptPoopLibrary))
    gulp.watch(config.gulp.src + "/views/**/*.html").on("change", templateTask)
    gulp.watch(config.gulp.src + "/**/assets/styles/**/*.scss").on("change", gulp.parallel(styleGlobal, stylePoopLibrary))
    gulp.watch(config.gulp.src + "/**/assets/images/**/*").on("change", gulp.parallel(imageGlobal, imagePoopLibrary))
}

// Defining MAJOR tasks
const clean = gulp.series(cleanTask)
const build = gulp.series(cleanTask, gulp.parallel(templateTask, imageGlobal, imagePoopLibrary, styleGlobal, stylePoopLibrary, javascriptGlobal, javascriptPoopLibrary))
const watch = gulp.series(watchTask)

// Exporting MAJOR tasks
exports.watch = watch
exports.build = build
exports.default = build
exports.clean = clean