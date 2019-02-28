import debug from "../common/debug";

const command = {
  name: "command",
  value: "target"
};

const args = {
  name: "arguments",
  value: "list"
};

const verbose = {
  name: "verbose",
  value: "true"
};

debug("rustup.js", command, args, verbose);
