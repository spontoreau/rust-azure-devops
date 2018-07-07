import {
    exec,
    getInput,
    setResult,
    TaskResult,
    which,
} from "vsts-task-lib";

(async () => {
    try {
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
