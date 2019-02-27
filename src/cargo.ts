import { getInput } from "azure-pipelines-task-lib";
import { join } from "path";
import { createCommand, executeCommand } from "./common/command";
import { launch } from "./common/launch";
import { getVerboseOption } from "./common/options";

const workingDir = getInput("cargoWorkingDir");
const manifestPath = !workingDir
  ? ""
  : `--manifest-path ${join(workingDir, "Cargo.toml")}`;

const command = createCommand(
  "cargo",
  getInput("cargoCommand"),
  `${getInput("cargoCommandOptions")} ${manifestPath} ${getVerboseOption()}`
);

launch(async () => await executeCommand(command));
