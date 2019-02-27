import { getInput } from "azure-pipelines-task-lib";
import { createInputCommand, executeCommand } from "./common/command";
import { getVerboseInput } from "./common/inputs";
import { launch } from "./common/launch";

const command = createInputCommand(
  "rustc",
  getInput("rustcInput"),
  `${getInput("rustcOptions")} ${getVerboseInput()}`
);

launch(async () => await executeCommand(command));
