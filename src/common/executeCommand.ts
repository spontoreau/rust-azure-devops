import {
    exec,
    setResult,
    TaskResult,
    which,
} from "vsts-task-lib";

import addCargoToPath from "./addCargoToPath";

export default async (command: string, args: string) => {
    addCargoToPath();
    
    const toolArgs = args
        ? [command, ...args.split(" ")]
        : command;

    which("cargo")
        ? await await exec("cargo", toolArgs) > 0
            ? setResult(TaskResult.Failed, "Error")
            : setResult(TaskResult.Succeeded, "Task done!")
        : setResult(TaskResult.Failed, "Cargo is not available");
}