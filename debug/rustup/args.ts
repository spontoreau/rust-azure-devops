import debug from "../common/debug";
import { join } from "path";

const rustupCommandInput = { 
    name: "rustupCommand", 
    value: "target" 
};

const rustupCommandArgsInput = { 
    name: "rustupCommandArguments", 
    value: "list" 
};

debug("rustup.js", rustupCommandInput, rustupCommandArgsInput);