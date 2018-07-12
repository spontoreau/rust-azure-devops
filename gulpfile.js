const gulp = require("gulp");
const tsc = require("gulp-typescript");
const del = require("del");
const runSequence = require("run-sequence");
const rename = require("gulp-rename");
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

    streams.push(tasksFilesCopyStream);

    const files = fs.readdirSync("./tmp/");

    files.forEach((file) => {
        const source = `./tmp/${file}`;
        console.log(source);
        const stat = fs.statSync(source);

        if (stat && stat.isFile()) {
            const target = `./tmp/tasks/${file.replace(/\.[^/.]+$/, "")}`;
            console.log(target);
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

//Default
gulp.task("default", (cb) => runSequence("clean", "compile", "copy", cb));