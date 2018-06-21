import { which } from "vsts-task-lib";

export default () =>  which("rustup") ? Promise.resolve(true) : Promise.resolve(false);