import {
    getInput,
    setResult,
    TaskResult,
} from "vsts-task-lib";

import executeCommand from "./common/executeCommand";

(async (command, args) => {
    try {
        await executeCommand("rustup", command, args);
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})(
    getInput("rustupCommand"),
    getInput("rustupCommandArguments"),
);
