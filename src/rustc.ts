import {
    getInput,
    setResult,
    TaskResult,
} from "azure-pipelines-task-lib";

import executeCommand from "./common/command";

(async (options, input) => {
    try {
        await executeCommand("rustc", input, options, true);
        setResult(TaskResult.Succeeded, "Task done!");
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})(
    getInput("rustcOptions"),
    getInput("rustcInput"),
);
