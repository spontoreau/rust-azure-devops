import {
    exec,
    getInput,
    setResult,
    TaskResult,
    which,
} from "vsts-task-lib";

import os from "os";
import path from "path";
import process from "process";

(async () => {
    try {
        addCargoToPath();

        const commandInput = getInput("cargoCommand");
        const argsInput = getInput("cargoCommandArguments");

        const args = argsInput
            ? [commandInput, ...argsInput.split(" ")]
            : commandInput;

        which("cargo")
            ? await await exec("cargo", args) > 0
                ? setResult(TaskResult.Failed, "Error")
                : setResult(TaskResult.Succeeded, "Task done!")
            : setResult(TaskResult.Failed, "Cargo is not available");
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})();

function addCargoToPath() {
    const cargoPath = path.join(os.homedir(), ".cargo", "bin");
    process.env.PATH = process.env.PATH
        ? cargoPath + path.delimiter + process.env.PATH
        : cargoPath;
}
