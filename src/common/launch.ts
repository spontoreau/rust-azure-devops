import { setResult, TaskResult } from "azure-pipelines-task-lib";

const launch = async (task: (...parameters: any[]) => Promise<string>) => {
  try {
    const resultMessage = await task();
    setResult(TaskResult.Succeeded, resultMessage);
  } catch (e) {
    setResult(TaskResult.Failed, e.message);
  }
};

export { launch };
