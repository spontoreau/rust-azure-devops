import { getInput } from "azure-pipelines-task-lib";
import { createInputCommand, executeCommand } from "./common/command";
import { launch } from "./common/launch";

const command = createInputCommand(
  "rustc",
  getInput("rustcInput"),
  getInput("rustcOptions")
);

launch(async () => await executeCommand(command));
