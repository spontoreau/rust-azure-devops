import { getInput } from "azure-pipelines-task-lib";
import { join } from "path";
import { createCommand, executeCommand } from "./common/command";
import { getVerboseInput } from "./common/inputs";
import { launch } from "./common/launch";

const workingDir = getInput("cargoWorkingDir");
const manifestPath = !workingDir
  ? ""
  : `--manifest-path ${join(workingDir, "Cargo.toml")}`;

const command = createCommand(
  "cargo",
  getInput("cargoCommand"),
  `${getInput("cargoCommandOptions")} ${manifestPath} ${getVerboseInput()}`
);

launch(async () => await executeCommand(command));
