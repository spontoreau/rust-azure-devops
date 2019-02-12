import {
    exec,
    which,
} from "azure-pipelines-task-lib";

import {
    addRustToolToPath
} from "./path";

export default async (tool: string, command: string, args: string, isInput: boolean = false) => {
    addRustToolToPath();

    const toolArgs = args
        ? isInput
            ? [...args.split(" "), command]
            : [command, ...args.split(" ")]
        : command;

    return which("cargo")
        ? await exec(tool, toolArgs) > 0
            ? Promise.reject(new Error("An error has occured."))
            : Promise.resolve()
        : Promise.reject(new Error("Rust toolchains are not available."));
};
