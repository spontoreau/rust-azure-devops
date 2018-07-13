import { join } from "path";
import { TaskMockRunner } from "vsts-task-lib/mock-run";

const taskPath = join(__dirname, "../../", "index.js");

const taskMockRunner = new TaskMockRunner(taskPath);
taskMockRunner.setInput("cargoCommand", "help");
taskMockRunner.run();
