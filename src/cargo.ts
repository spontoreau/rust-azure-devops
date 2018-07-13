import {
    exec,
    getInput,
    setResult,
    TaskResult,
    which,
} from "vsts-task-lib";

import addCargoToPath from "./common/addCargoToPath";

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


