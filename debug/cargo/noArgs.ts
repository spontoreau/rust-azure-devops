import debug from "../common/debug";
import { join } from "path";

const taskPath = join(__dirname, "../../src", "cargo.js");
const cargoCommandInput = { 
    name: "cargoCommand", 
    value: "help" 
};

debug("cargo.js", cargoCommandInput);