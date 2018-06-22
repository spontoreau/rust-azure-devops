import tl from "vsts-task-lib";

const isRustupAvailable = () => tl.which("rustup") ? Promise.resolve(true) : Promise.resolve(false);

(async () => {
    try {
        const rustupAvailable = await isRustupAvailable();
        tl.debug(`${rustupAvailable}`);
    } catch(err) {
        tl.error(err);
    }
})();