import debug from "../common/debug";
import { join } from "path";

const cargoCommandInput = { 
    name: "cargoCommand", 
    value: "search" 
};

const cargoCommandArgsInput = { 
    name: "cargoCommandArguments", 
    value: "rocket --limit 1" 
};

debug("cargo.js", cargoCommandInput, cargoCommandArgsInput);