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

        const command = getInput("cargoCommand");
        const args = getInput("cargoCommandArguments");

        await executeCommand(command, args);
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})();

async function executeCommand(command: string, args: string) {
    const toolArgs = args
        ? [command, ...args.split(" ")]
        : command;
    which("cargo")
        ? await await exec("cargo", toolArgs) > 0
            ? setResult(TaskResult.Failed, "Error")
            : setResult(TaskResult.Succeeded, "Task done!")
        : setResult(TaskResult.Failed, "Cargo is not available");
}
