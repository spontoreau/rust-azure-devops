"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var mock_run_1 = require("vsts-task-lib/mock-run");
var taskPath = path_1.join(__dirname, '../../', 'cargo.js');
var taskMockRunner = new mock_run_1.TaskMockRunner(taskPath);
taskMockRunner.setInput("cargoCommand", "search");
taskMockRunner.setInput("cargoCommandArguments", "rocket --limit 1");
taskMockRunner.run();
