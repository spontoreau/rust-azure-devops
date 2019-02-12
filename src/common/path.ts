import { delimiter, join } from "path";
import process from "process";
import { homedir } from "os";

const addRustToolToPath = () => {
    const toolPath = getToolPath();
    const path = process.env.PATH;
    process.env.PATH = !path
        ? toolPath
        : combineToPath(path, toolPath);
};

const combineToPath = (path: string, toolPath: string) => {
    return isInPath(path, toolPath)
        ? path
        : `${ toolPath }${ delimiter }${ path }`;
};

const isInPath = (path: string, toolPath: string) => {
    return !!path && path.indexOf(toolPath) !== -1
};

const getToolPath = () => {
    return join(homedir(), ".cargo", "bin");
};

export {
    addRustToolToPath
}