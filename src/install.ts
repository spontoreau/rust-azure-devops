import {
    debug,
    exec,
    getBoolInput,
    setResult,
    TaskResult,
    tool,
    which,
} from "vsts-task-lib";
import addCargoToPath from "./common/addCargoToPath";
import executeCommand from "./common/executeCommand";

(async (installNightly: boolean) => {
    try {
        addCargoToPath();

        const returnCode = which("rustup")
                ? await update()
                : await downloadAndInstall();

        if (installNightly) {
            await executeCommand("rustup", "install", "nightly");
            await executeCommand("rustup", "default", "nightly");
            setResult(TaskResult.Succeeded, "Rust nightly installed");
        } else {
            setUpdateResult(returnCode);
        }
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})(getBoolInput("installNightly"));

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
