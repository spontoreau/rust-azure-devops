import { getInput, setResult, TaskResult } from "azure-pipelines-task-lib";

import {
  Command,
  executeCommand
} from "./common/command";
import { launch } from "./common/launch";

const name = getInput("cargoCommand");
const options = getInput("cargoCommandOptions");

const command: Command = {
  args: options.split(" "),
  name: name,
  tool: "cargo"
}

launch(async () => await executeCommand(command));