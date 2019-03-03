import { getBoolInput, getInput } from "azure-pipelines-task-lib";
import { join } from "path";

const getVerboseOption = () => {
  return getBoolInput("verbose") ? "--verbose" : "";
};

const getWorkingDirectoryOption = () => {
  const workingDir = getInput("workingDirectory");
  return !workingDir ? "" : `--manifest-path ${join(workingDir, "Cargo.toml")}`;
};

const getCommand = () => {
  return getInput("command");
};

const getOptions = () => {
  return getInput("options");
};

const getFileInput = () => {
  return getInput("inputFile");
};

export {
  getCommand,
  getFileInput,
  getOptions,
  getVerboseOption,
  getWorkingDirectoryOption
};
