import { getInput } from "azure-pipelines-task-lib";
import { createCommand, executeCommand } from "./common/command";
import { getVerboseInput } from "./common/inputs";
import { launch } from "./common/launch";

const command = createCommand(
  "rustup",
  getInput("rustupCommand"),
  `${getInput("rustupCommandArguments")} ${getVerboseInput()}`
);

launch(async () => await executeCommand(command));
