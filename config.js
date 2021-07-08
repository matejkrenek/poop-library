module.exports = {
    mode: "development",        /* production - development */
    gulpfile: {
        srcDir: "./src",
        destDir: "./build",
        uglify: true,
        babel: true
    },
    javascript: {
        consoleLog: false,
    },
    font: {
        family: "Roboto",
        weight: [100, 300, 400, 500, 700, 900]
    }
}

