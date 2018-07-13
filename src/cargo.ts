import {
    exec,
    getInput,
    setResult,
    TaskResult,
    which,
} from "vsts-task-lib";

import addCargoToPath from "./common/addCargoToPath";
import executeCommand from "./common/executeCommand";

(async () => {
    try {
        addCargoToPath();

        const command = getInput("cargoCommand");
        const args = getInput("cargoCommandArguments");

        await executeCommand(command, args);
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})();
