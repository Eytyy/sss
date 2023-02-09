import { createProject } from './main.js';
import parseArgumentsIntoOptions from './utils/parse-arguments-into-options.js';
import promptForMissingOptions from './utils/prompt-for-missing-options.js';
export default async function cli(rawArgs) {
    let options = parseArgumentsIntoOptions(rawArgs);
    options = await promptForMissingOptions(options);
    await createProject(options);
}
//# sourceMappingURL=cli.js.map