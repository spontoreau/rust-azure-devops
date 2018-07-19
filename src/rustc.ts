import {
    getInput,
    setResult,
    TaskResult,
    which,
    exec,
} from "vsts-task-lib";

import executeCommand from "./common/executeCommand";
import addCargoToPath from "./common/addCargoToPath";

(async (options, input) => {
    try {
        addCargoToPath();
    
        const toolArgs = options
            ? [...options.split(" "), input]
            : input;
    
        if(which("cargo")) {
            const returnCode = await exec("rustc", toolArgs);
            if(returnCode === 0) {
                setResult(TaskResult.Succeeded, "Task done!");
            } else {
                setResult(TaskResult.Failed, "An error has occured.");
            }
        } else {
            setResult(TaskResult.Failed, "Rust toolchains are not available.");
        }
    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})(
    getInput("rustcOptions"),
    getInput("rustcInput"),
);
