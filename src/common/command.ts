import { exec, which } from "azure-pipelines-task-lib";

import { addRustToolToPath } from "./path";

type Command = {
  tool: string;
  name: string;
  args: string[];
};

type InputCommand = {
  tool: string;
  input: string;
  args: string[];
};

const executeCommand = async (
  command: Command | InputCommand,
  resultMessage: string = "Task done!"
): Promise<string> => {
  addRustToolToPath();
  const toolArgs = getToolArgs(command);
  return which("cargo")
    ? (await exec(command.tool, toolArgs)) > 0
      ? Promise.reject(new Error("An error has occured."))
      : Promise.resolve(resultMessage)
    : Promise.reject(new Error("Rust toolchains are not available."));
};

const getToolArgs = (command: Command | InputCommand) => {
  return isInputCommand(command)
    ? [...command.args, command.input]
    : [command.name, command.args];
};

const isInputCommand = (command: any): command is InputCommand => {
  return command.input !== undefined;
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

const createInputCommand = (
  tool: string,
  input: string,
  options: string
): InputCommand => {
  return {
    args: options.split(" "),
    input: input,
    tool: tool
  };
};

export { Command, executeCommand, createCommand, createInputCommand };
