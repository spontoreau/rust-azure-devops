import debug from "../common/debug";
import { join } from "path";

const input = {
  name: "input",
  value: join(__dirname, "test.rs")
};

debug("rustc.js", input);
