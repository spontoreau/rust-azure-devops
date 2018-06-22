import { exec, setResult, TaskResult, which } from "vsts-task-lib";

(async () => {
    try {
        if(!which("rustup")) {
            console.log(`Rustup not available.`);
        } else {
            const updated = await exec("rustup", "update") > 0;

            setResult(
                updated ? TaskResult.Succeeded : TaskResult.Succeeded,
                updated ? "Rust updated." : "Rustup update failed."
            );
        }
    } catch(e) {
        setResult(TaskResult.Failed, e.message);
    }
})();