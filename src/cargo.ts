import {
    getInput,
    setResult,
    TaskResult,
} from "vsts-task-lib";

import executeCommand from "./common/executeCommand";

(async (command, options) => {
    try {
        await executeCommand("cargo", command, options);
        setResult(TaskResult.Succeeded, "Task done!");
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})(
    getInput("cargoCommand"),
    getInput("cargoCommandOptions"),
);
