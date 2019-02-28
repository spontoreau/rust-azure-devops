import debug from "../common/debug";
import { join } from "path";

const command = {
  name: "command",
  value: "build"
};

const options = {
  name: "options",
  value: "--release"
};

const workingDirectory = {
  name: "workingDirectory",
  value: join(__dirname, "sample")
};

const verbose = {
  name: "verbose",
  value: "true"
};

debug(
  "cargo.js",
  command,
  options,
  workingDirectory,
  verbose
);
