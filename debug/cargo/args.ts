import debug from "../common/debug";

const cargoCommandInput = { 
    name: "cargoCommand", 
    value: "search" 
};

const cargoCommandArgsInput = { 
    name: "cargoCommandArguments", 
    value: "rocket --limit 1" 
};

debug("cargo.js", cargoCommandInput, cargoCommandArgsInput);