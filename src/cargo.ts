import {
    exec,
    getInput,
    setResult,
    TaskResult,
    which,
} from "vsts-task-lib";

import addCargoToPath from "./common/addCargoToPath";
import executeCommand from "./common/executeCommand";

(async (command, args) => {
    try {
        await executeCommand(command, args);
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})(
    getInput("cargoCommand"),
    getInput("cargoCommandArguments"),
);
