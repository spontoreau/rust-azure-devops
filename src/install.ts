import {
    debug,
    exec,
    setResult,
    TaskResult,
    tool,
    which,
} from "vsts-task-lib";

(async () => {
    try {
        const returnCode = which("rustup")
                ? await update()
                : await downloadAndInstall();
        setUpdateResult(returnCode);
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})();

async function downloadAndInstall() {
    debug("Rustup not available.");
    return await tool(which("curl"))
            .arg("https://sh.rustup.rs")
            .arg("-sSf")
            .pipeExecOutputToTool(tool(which("sh"))
                                    .arg("-s")
                                    .arg("--")
                                    .arg("-y"))
            .exec();
}

async function update() {
    debug("Rustup available.");
    return await exec("rustup", "update");
}

function setUpdateResult(returnCode: Readonly<number>) {
    debug(`Return code: ${returnCode}`);
    const updated = returnCode === 0;
    setResult(
        updated
            ? TaskResult.Succeeded
            : TaskResult.Failed,
        updated
            ? "Rust updated."
            : "Rustup update failed.");
}
