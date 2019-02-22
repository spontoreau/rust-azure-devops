import { join } from "path";
import { getInput } from "azure-pipelines-task-lib";
import { executeCommand, createCommand } from "./common/command";
import { launch } from "./common/launch";

const workingDir = getInput("cargoWorkingDir")
const manifestPath = !workingDir
  ? ""
  : `--manifest-path ${ join(workingDir,"Cargo.toml") }`;

const command = createCommand(
  "cargo",
  getInput("cargoCommand"),
  `${getInput("cargoCommandOptions")} ${ manifestPath }`
);

launch(async () => await executeCommand(command));
