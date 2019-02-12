import { setResult, TaskResult } from "azure-pipelines-task-lib";

const launch = async (task: (...parameters: any[]) => Promise<void>) => {
  try {
    await task();
    setResult(TaskResult.Succeeded, "Task done!");
  } catch (e) {
    setResult(TaskResult.Failed, e.message);
  }
};

export {
  launch
}