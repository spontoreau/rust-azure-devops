import { delimiter, join } from "path";
import process from "process";
import { homedir } from "os";

export default () => {
    const cargoPath = join(homedir(), ".cargo", "bin");
    process.env.PATH = process.env.PATH
        ? cargoPath + delimiter + process.env.PATH
        : cargoPath;
}