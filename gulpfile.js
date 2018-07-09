const gulp = require("gulp");
const tsc = require("gulp-typescript");
const del = require("del");
const runSequence = require("run-sequence");

//Clean
gulp.task("clean", () => del("lib"));

//Build src
gulp.task("build", () => {
    const tscConfig = tsc.createProject("tsconfig.json", {
        module: "commonjs",
        noResolve: false,
        typescript: require("typescript")
    });

    return gulp
        .src(["src/**/*.ts", '!src/debug/**/*.*'])
        .pipe(tscConfig())
        .on("error", (err) => process.exit(1))
        .pipe(gulp.dest("build/"));
});

//Default
gulp.task("default", (cb) => runSequence("clean", "build", cb));