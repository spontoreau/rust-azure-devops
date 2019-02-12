import {
  debug,
  exec,
  getBoolInput,
  tool,
  which
} from "azure-pipelines-task-lib";
import { addRustToolToPath } from "./common/path";
import { executeCommand, createCommand } from "./common/command";
import { launch } from "./common/launch";

const nightly = getBoolInput("installNightly");

launch(async () => {
  addRustToolToPath();
  const returnCode = which("rustup") ? await update() : await install();
  return nightly ? await installNightly() : checkUpdateResult(returnCode);
});

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
  if (returnCode !== 0) throw new Error("Rustup update failed.");
  return "Rust updated";
};
