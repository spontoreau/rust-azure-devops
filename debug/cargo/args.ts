import debug from "../common/debug";
import { join } from "path";

const taskPath = join(__dirname, "../../src", "cargo.js");
const cargoCommandInput = { 
    name: "cargoCommand", 
    value: "search" 
};

const cargoCommandArgsInput = { 
    name: "cargoCommandArguments", 
    value: "rocket --limit 1" 
};

debug(taskPath, cargoCommandInput, cargoCommandArgsInput);