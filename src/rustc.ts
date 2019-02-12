import { getInput, setResult, TaskResult } from "azure-pipelines-task-lib";

import executeCommand from "./common/command";

(async (options, input) => {
  try {
    /*const toolArgs = args
  ? isInput
    ? [...args.split(" "), command]
    : [command, ...args.split(" ")]
  : command;*/

    await executeCommand("rustc", input, options, true);
    setResult(TaskResult.Succeeded, "Task done!");
  } catch (e) {
    setResult(TaskResult.Failed, e.message);
  }
})(getInput("rustcOptions"), getInput("rustcInput"));
