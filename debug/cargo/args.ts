import { join } from "path";
import { TaskMockRunner } from "vsts-task-lib/mock-run";

const taskPath = join(__dirname, "../../src", "cargo.js");

const taskMockRunner = new TaskMockRunner(taskPath);
taskMockRunner.setInput("cargoCommand", "search");
taskMockRunner.setInput("cargoCommandArguments", "rocket --limit 1");
taskMockRunner.run();
