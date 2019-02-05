import {
    exec,
    which,
} from "azure-pipelines-task-lib";

import addCargoToPath from "./addCargoToPath";

export default async (tool: string, command: string, args: string, isInput: boolean = false) => {
    if (!tool || !command) {
        return Promise.reject(new Error(`${ !tool ? "'tool'" : "'command'" } argument is required`));
    }

    addCargoToPath();

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
