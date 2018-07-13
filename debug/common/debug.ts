import { join } from "path";
import { TaskMockRunner } from "vsts-task-lib/mock-run";
import { Input } from "./input";

export default (file: string, commandInput: Input, argsInput?: Input) => {
    const taskPath = join(__dirname, "../../src", file);

    const taskMockRunner = new TaskMockRunner(taskPath);
    taskMockRunner.setInput(commandInput.name, commandInput.value);

    if(argsInput) {
        taskMockRunner.setInput(argsInput.name, argsInput.value);
    }

    taskMockRunner.run();
}

