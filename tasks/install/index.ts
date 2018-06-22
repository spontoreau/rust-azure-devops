import tl from "vsts-task-lib";

(async () => {
    try {
        if(!tl.which("rustup")) {
            console.log(`Rustup not available.`);
        } else {
            const returnCode = await tl.exec("rustup", "update");

            if(returnCode > 0) {
                tl.setResult(tl.TaskResult.Failed, "Rustup update failed.");
            } else {
                tl.setResult(tl.TaskResult.Succeeded, "Rust updated.");
            }
        }
    } catch(e) {
        tl.setResult(tl.TaskResult.Failed, e.message);
    }
})();