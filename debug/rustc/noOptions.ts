import debug from "../common/debug";
import { join } from "path";

const rustcInput = {
  name: "rustcInput",
  value: join(__dirname, "test.rs")
};

debug("rustc.js", rustcInput);
