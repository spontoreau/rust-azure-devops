import { exec, setResult, TaskResult, which, tool } from "vsts-task-lib";

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
    console.log(`Rustup not available.`);
    const curl = tool(which("curl"));
    curl.arg("https://sh.rustup.rs").arg("-sSf");
    const sh = tool(which("sh"));
    sh.arg("-s").arg("--").arg("-y");
    curl.pipeExecOutputToTool(sh);
    const updated = await curl.exec() === 0;
    setUpdateResult(updated);
}

async function update() {
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

