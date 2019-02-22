import debug from "../common/debug";
import { join } from "path";

const rustcInput = {
  name: "rustcInput",
  value: join(__dirname, "test.rs")
};

const rustcOptions = {
  name: "rustcOptions",
  value: "-o azure-devops-rustc-debug"
};

debug("rustc.js", rustcOptions, rustcInput);
