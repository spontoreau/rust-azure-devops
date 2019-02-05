import { join } from "path";
import { TaskMockRunner } from "azure-pipelines-task-lib/mock-run";
import { Input } from "./input";

export default (file: string, ...input: Input[]) => {
    const taskPath = join(__dirname, "../../src", file);
    const taskMockRunner = new TaskMockRunner(taskPath);
    input.forEach(i => taskMockRunner.setInput(i.name, i.value));
    taskMockRunner.run();
}

