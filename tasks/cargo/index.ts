import {
    debug,
    exec,
    getInput,
    setResult,
    TaskResult,
    tool,
    which,
} from "vsts-task-lib";

import {
    ToolRunner,
} from "vsts-task-lib/toolrunner";

(async () => {
    try {
        const command = getInput("cargoCommand");
        const args = getInput("cargoCommandArguments");

        !!which("cargo")
            ? await await exec("cargo", [command, ...args.split(" ")]) > 0
                ? setResult(TaskResult.Failed, "Error")
                : setResult(TaskResult.Succeeded, "Task done!")
            : setResult(TaskResult.Failed, "Cargo is not available");
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})();
