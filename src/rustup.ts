import {
    getInput,
    setResult,
    TaskResult,
} from "vsts-task-lib";

import executeCommand from "./common/executeCommand";

(async (command, args) => {
    try {
        await executeCommand("rustup", command, args);
        setResult(TaskResult.Succeeded, "Task done!");
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})(
    getInput("rustupCommand"),
    getInput("rustupCommandArguments"),
);
