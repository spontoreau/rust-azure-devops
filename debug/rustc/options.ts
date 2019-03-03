import debug from "../common/debug";
import { join } from "path";

const input = {
  name: "inputFile",
  value: join(__dirname, "test.rs")
};

const options = {
  name: "options",
  value: "-o azure-devops-rustc-debug"
};

const verbose = {
  name: "verbose",
  value: "true"
};

debug("rustc.js", options, input, verbose);
