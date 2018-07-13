import {
    setResult,
    TaskResult,
} from "vsts-task-lib";

(async () => {
    try {

    } catch (e) {
        setResult(TaskResult.Failed, e.message);
    }
})();
