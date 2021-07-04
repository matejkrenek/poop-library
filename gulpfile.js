const gulp = require("gulp")
const sass = require("gulp-sass")
const autoprefixer = require("gulp-autoprefixer")
const sourcemaps = require("gulp-sourcemaps")
const babel = require("gulp-babel")
const rename = require("gulp-rename")
const concat = require("gulp-concat")
const imagemin = require("gulp-imagemin")
const nunjucks = require("gulp-nunjucks-render")
const del = require("del")
const { gulpfile } = require("./config")

// Directories
const srcDir = gulpfile.srcDir
const destDir = gulpfile.destDir



// [] jsTask
// [] imageTask
// [] stylesTask 
// [] templatesTask 

// [] build task
// [] watch task

exports.default = () => {
    console.log(srcDir)
    console.log(destDir)
}