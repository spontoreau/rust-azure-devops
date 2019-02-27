import debug from "../common/debug";
import { join } from "path";

const cargoCommandInput = {
  name: "cargoCommand",
  value: "build"
};

const cargoCommandOptionsInput = {
  name: "cargoCommandOptions",
  value: "--release"
};

const cargoCommandWorkingDirectory = {
  name: "cargoWorkingDir",
  value: join(__dirname, "sample")
};

const verbose = {
  name: "verbose",
  value: "true"
};

debug(
  "cargo.js",
  cargoCommandInput,
  cargoCommandOptionsInput,
  cargoCommandWorkingDirectory,
  verbose
);
