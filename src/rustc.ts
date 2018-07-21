import {
    getInput,
    setResult,
    TaskResult,
} from "vsts-task-lib";

import executeCommand from "./common/executeCommand";

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
