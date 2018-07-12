const gulp = require("gulp");
const tsc = require("gulp-typescript");
const del = require("del");
const runSequence = require("run-sequence");
const rename = require("gulp-rename");
const run = require("gulp-run");
const fs = require("fs");

//Clean
gulp.task("clean", () => del("tmp"));

//compile src
gulp.task("compile", () => {
    const tscConfig = tsc.createProject("tsconfig.json", {
        target: "es2015",
        module: "commonjs",
        noResolve: false,
        typescript: require("typescript")
    });

    return gulp
        .src(["./src/**/*.ts", '!./src/debug/**/*.*'])
        .pipe(tscConfig())
        .on("error", (err) => process.exit(1))
        .pipe(gulp.dest("./tmp/"));
});

gulp.task("copy", () => {
    const streams = [];

    const tasksFilesCopyStream = gulp
                            .src(["./tasks/**/*.*"])
                            .pipe(gulp.dest("./tmp/tasks"));

    const manifestCopyStream = gulp
                                .src(["./vss-extension.json", "./DETAILS.md", "./LICENSE", , "./icon.png"])
                                .pipe(gulp.dest("./tmp/"));

    streams.push(tasksFilesCopyStream);
    streams.push(manifestCopyStream);

    const files = fs.readdirSync("./tmp/");

    files.forEach((file) => {
        const source = `./tmp/${file}`;
        const stat = fs.statSync(source);

        if (stat && stat.isFile()) {
            const target = `./tmp/tasks/${file.replace(/\.[^/.]+$/, "")}`;
            const stream = gulp
                .src(source)
                .pipe(rename("index.js"))
                .pipe(gulp.dest(target));
            streams.push(stream);
            streams.push(del(source));
        }
    });
    return streams;
});

gulp.task("install", () => {
    return [
        run("npm install vsts-task-lib --prefix ./tmp/tasks/install").exec(),
        run("npm install vsts-task-lib --prefix ./tmp/tasks/cargo").exec()
    ]
});

gulp.task("package", () => {
    return run("tfx extension create --manifest-globs ./tmp/vss-extension.json --output-path ./dist").exec()
})

//Default
gulp.task("default", (cb) => runSequence("clean", "compile", "copy", "install", "package", cb));