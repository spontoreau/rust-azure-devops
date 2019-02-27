import { getBoolInput } from "azure-pipelines-task-lib";

const getVerboseInput = () => {
  return getBoolInput("verbose") ? "" : "--verbose";
};

export { getVerboseInput };
