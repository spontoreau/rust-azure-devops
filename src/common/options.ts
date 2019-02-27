import { getBoolInput } from "azure-pipelines-task-lib";

const getVerboseOption = () => {
  return getBoolInput("verbose") ? "--verbose" : "";
};

export { getVerboseOption };
