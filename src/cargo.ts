import { createCommand, executeCommand } from "./common/command";
import { launch } from "./common/launch";
import {
  getCommand,
  getOptions,
  getVerboseOption,
  getWorkingDirectoryOption
} from "./common/inputs";

const command = createCommand(
  "cargo",
  getCommand(),
  `${getOptions()} ${getWorkingDirectoryOption()} ${getVerboseOption()}`
);

launch(async () => await executeCommand(command));
