import { getInput } from "azure-pipelines-task-lib";
import { executeCommand, createCommand } from "./common/command";
import { launch } from "./common/launch";

const command = createCommand(
  "rustup",
  getInput("rustupCommand"),
  getInput("rustupCommandArguments")
);

launch(async () => await executeCommand(command));
