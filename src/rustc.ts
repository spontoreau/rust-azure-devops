import { createInputCommand, executeCommand } from "./common/command";
import { launch } from "./common/launch";
import { getFileInput, getOptions, getVerboseOption } from "./common/inputs";

const command = createInputCommand(
  "rustc",
  getFileInput(),
  `${getOptions()} ${getVerboseOption()}`
);

launch(async () => await executeCommand(command));
