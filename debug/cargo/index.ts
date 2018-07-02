import { join } from "path";
import { TaskMockRunner } from "vsts-task-lib/mock-run";

const taskPath = join(__dirname, '../../tasks/cargo', 'index.js');
const taskMockRunner = new TaskMockRunner(taskPath);

taskMockRunner.setInput("cargoCommand", "search");
taskMockRunner.setInput("cargoCommandArguments", "rocket");
taskMockRunner.run();