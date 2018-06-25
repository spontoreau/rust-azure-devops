import { debug, exec, setResult, TaskResult, which, tool } from "vsts-task-lib";

(async () => {
    try {
        if (!which("rustup")) {
            await downloadAndInstall();
        } else {
            await update();
        }
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})();

async function downloadAndInstall() {
    debug("Rustup not available.");
    const updated = await tool(which("curl"))
            .arg("https://sh.rustup.rs")
            .arg("-sSf")
            .pipeExecOutputToTool(tool(which("sh"))
                                    .arg("-s")
                                    .arg("--")
                                    .arg("-y")
            ).exec() === 0;
    setUpdateResult(updated);
}

async function update() {
    debug("Rustup available.");
    const updated = await exec("rustup", "update") === 0;
    setUpdateResult(updated);
}

function setUpdateResult(updated: boolean) {
    setResult(
        updated 
            ? TaskResult.Succeeded 
            : TaskResult.Failed, 
        updated 
            ? "Rust updated." 
            : "Rustup update failed.");
}

