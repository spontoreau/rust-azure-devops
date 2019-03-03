import { createCommand, executeCommand } from "./common/command";
import { launch } from "./common/launch";
import { getCommand, getVerboseOption, getOptions } from "./common/inputs";

const command = createCommand(
  "rustup",
  `${getVerboseOption()} ${getCommand()}`,
  getOptions()
);

launch(async () => await executeCommand(command));
