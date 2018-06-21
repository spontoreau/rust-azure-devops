import { exec } from "child_process";
import { promisify } from "util";

export default () =>  promisify(exec)('rustup --version')
        .then(() => Promise.resolve(true))
        .catch((err: Error) => {
            console.error(err.message);
            return Promise.resolve(false);
        });