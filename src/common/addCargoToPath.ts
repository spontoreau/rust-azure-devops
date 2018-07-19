import { homedir } from "os";
import { delimiter, join } from "path";
import process from "process";

export default () => {
    const cargoPath = join(homedir(), ".cargo", "bin");

    if (process.env.PATH) {
        if (process.env.PATH.indexOf(cargoPath) === -1) {
            process.env.PATH = `${cargoPath}${delimiter}${process.env.PATH}`;
        }
    } else {
        process.env.PATH = cargoPath;
    }
};
