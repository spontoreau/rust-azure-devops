import { getInput } from "azure-pipelines-task-lib";
import { executeCommand, createCommand } from "./common/command";
import { launch } from "./common/launch";

const command = createCommand(
  "cargo",
  getInput("cargoCommand"),
  getInput("cargoCommandOptions")
);

launch(async () => await executeCommand(command));
