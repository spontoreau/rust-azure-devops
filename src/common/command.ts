import { exec, which } from "azure-pipelines-task-lib";

import { addRustToolToPath } from "./path";

type Command = {
  tool: string;
  name: string;
  args: string[];
};

const executeCommand = async (command: Command) => {
  addRustToolToPath();
  const toolArgs = [command.name, ...command.args];
  return which("cargo")
    ? (await exec(command.tool, toolArgs)) > 0
      ? Promise.reject(new Error("An error has occured."))
      : Promise.resolve()
    : Promise.reject(new Error("Rust toolchains are not available."));
};

const createCommand = (
  tool: string,
  name: string,
  options: string
): Command => {
  return {
    args: options.split(" "),
    name: name,
    tool: tool
  };
};

export { Command, executeCommand, createCommand };