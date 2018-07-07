import {
    debug,
    exec,
    getInput,
    setResult,
    TaskResult,
    which,
} from "vsts-task-lib";

import os from "os";
import process from "process";

(async () => {
    try {
        const separator = os.platform() === "win32" ? ";" : ":";
        console.log(`Separator: ${separator}`);
        console.log(`OS: ${os.platform()}`);
        const cargoPath = ((system: string) => {
            switch(system) {
                case "win32":
                    return "c:/Users/VssAdministrator/.cargo/bin";
                case "darwin":
                    return "/Users/vsts/.cargo/bin";
                case "linux":
                    return "/root/.cargo/bin";
            }
        })(os.platform());
        console.log(`Cargo path: ${cargoPath}`);
        const currentPath = process.env["PATH"];
        process.env["PATH"] = process.env["PATH"]
            ? cargoPath + separator + currentPath
            : cargoPath;

        console.log(process.env["PATH"]);

        const command = getInput("cargoCommand");
        const argsInput = getInput("cargoCommandArguments");

        const args = argsInput
            ? [command, ...argsInput.split(" ")]
            : command;

        which("cargo")
            ? await await exec("cargo", args) > 0
                ? setResult(TaskResult.Failed, "Error")
                : setResult(TaskResult.Succeeded, "Task done!")
            : setResult(TaskResult.Failed, "Cargo is not available");
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})();
