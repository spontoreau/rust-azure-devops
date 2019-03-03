import { getInput } from "azure-pipelines-task-lib";
import { createCommand, executeCommand } from "./common/command";
import { launch } from "./common/launch";
import { getVerboseOption } from "./common/inputs";

const command = createCommand(
  "rustup",
  getInput("command"),
  `${getInput("arguments")} ${getVerboseOption()}`
);

launch(async () => await executeCommand(command));
