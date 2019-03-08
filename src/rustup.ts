import { getInput } from "azure-pipelines-task-lib";
import { createCommand, executeCommand } from "./common/command";
import { launch } from "./common/launch";
import { getVerboseOption } from "./common/options";

const command = createCommand(
  "rustup",
  `${getVerboseOption()} ${getInput("rustupCommand")}`,
  getInput("rustupCommandArguments")
);

launch(async () => await executeCommand(command));
