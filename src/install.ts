import {
  debug,
  exec,
  getBoolInput,
  tool,
  which
} from "azure-pipelines-task-lib";
import { createCommand, executeCommand } from "./common/command";
import { launch } from "./common/launch";
import { addRustToolToPath } from "./common/path";

const nightly = getBoolInput("nightly");

const install = async () => {
  debug("Rustup not available.");
  return await tool(which("curl"))
    .arg("https://sh.rustup.rs")
    .arg("-sSf")
    .pipeExecOutputToTool(
      tool(which("sh"))
        .arg("-s")
        .arg("--")
        .arg("-y")
    )
    .exec();
};

const update = async () => {
  debug("Rustup available.");
  return await exec("rustup", "update");
};

const installNightly = async () => {
  const installCommand = createCommand("rustup", "install", "nightly");
  const defaultCommand = createCommand("rustup", "default", "nightly");
  await executeCommand(installCommand);
  return await executeCommand(defaultCommand, "Rust nightly installed");
};

const checkUpdateResult = (returnCode: Readonly<number>) => {
  debug(`Return code: ${returnCode}`);
  if (returnCode !== 0) {
    throw new Error("Rustup update failed.");
  }
  return "Rust updated";
};

launch(async () => {
  addRustToolToPath();
  const returnCode = which("rustup") ? await update() : await install();
  const resultMessage = checkUpdateResult(returnCode);
  return nightly ? await installNightly() : resultMessage;
});
