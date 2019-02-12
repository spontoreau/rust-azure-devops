import {
    getInput,
    setResult,
    TaskResult,
} from "azure-pipelines-task-lib";

import executeCommand from "./common/command";

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
