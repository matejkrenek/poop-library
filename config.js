module.exports = {
    mode: "production",
    gulpfile: {
        srcDir: "./src",
        destDir: "./build",
        uglify: true,
        babel: true
    },
    javascript: {
        consoleLog: false,
    }
}

