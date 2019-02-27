import debug from "../common/debug";

const rustupCommandInput = {
  name: "rustupCommand",
  value: "target"
};

const rustupCommandArgsInput = {
  name: "rustupCommandArguments",
  value: "list"
};

const verbose = {
  name: "verbose",
  value: "true"
};

debug("rustup.js", rustupCommandInput, rustupCommandArgsInput, verbose);
