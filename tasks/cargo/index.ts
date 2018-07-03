import {
    debug,
    exec,
    getInput,
    setResult,
    TaskResult,
    tool,
    which
} from "vsts-task-lib";

import {
    ToolRunner
} from "vsts-task-lib/toolrunner";


(async () => {
    try {
        const command = getInput("cargoCommand");
        const args = getInput("cargoCommandArguments");

        if (!!which("cargo")) {
            const returnCode = await exec("cargo", [command, ...args.split(" ")]);
            if (returnCode > 0) {
                setResult(TaskResult.Failed, "Error");
            }
            else {
                setResult(TaskResult.Succeeded, "Task done!");
            }
        } else {
            setResult(TaskResult.Failed, "Cargo is not available");
        }
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})();