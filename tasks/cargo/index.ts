import { 
    debug,
    getInput
} from "vsts-task-lib";

(() => {
    const command = getInput("cargoCommand");
    const args = getInput("cargoCommandArguments");

    debug(`Command: ${command}, Arguments:${args}`);
})();