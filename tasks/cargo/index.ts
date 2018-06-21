import tl from "vsts-task-lib";
import checkRustup from "./checkRustup";

(async () => {
    try {
        const rustupAvailable = await checkRustup();
        tl.debug(`${rustupAvailable}`);
    } catch(err) {
        tl.error(err);
    }
})();