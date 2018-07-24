const gulp = require("gulp");
const tsc = require("gulp-typescript");
const del = require("del");
const runSequence = require("run-sequence");
const rename = require("gulp-rename");
const jeditor = require("gulp-json-editor");
const run = require("gulp-run");
const argv = require('yargs').argv;
const fs = require("fs");
const moment = require("moment");

const env = argv.release ? "" : "-beta";
const patch = (argv.patch !== null && argv.patch !== undefined)
                ? argv.patch 
                : moment().format("YYDDDHHmm");;

gulp.task("clean", () => del.sync("tmp"));

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
        .on("error", () => process.exit(1))
        .pipe(gulp.dest("./tmp/"));
});

gulp.task("copy", () => {
    const streams = [
        gulp
            .src("./tasks/**/*.*")
            .pipe(gulp.dest("./tmp/tasks")),
        gulp
            .src("./vss-extension.json")
            .pipe(jeditor((json) => {
                json.id = `rust-vsts${env}`;
                json.name = `Rust${env}`;
                json.public = env ? false : true;
                json.version = json.version.replace("{patch}", patch);
                return json;
            }))
            .pipe(gulp.dest("./tmp/")),
        gulp
            .src(["./DETAILS.md", "./LICENSE", "./icon.png"])
            .pipe(gulp.dest("./tmp/")),
        gulp
            .src("./images/*.png")
            .pipe(gulp.dest("./tmp/images/"))
    ];

    fs.readdirSync("./tmp/").forEach((file) => {
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
            streams.push(
                gulp
                    .src("./tmp/common/*.js")
                    .pipe(gulp.dest(`${ target }/common`))
            );
        }
    });
    return streams;
});

gulp.task("install", () => {
    return ["install", "cargo", "rustup", "rustc"]
        .map((vstsTask) => run(`npm install vsts-task-lib --prefix ./tmp/tasks/${vstsTask}`).exec());
});

gulp.task("default", (cb) => runSequence("clean", "compile", "copy", "install", cb));

gulp.task("pre-package", () => del("./tmp/common"));
