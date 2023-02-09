import { createProject } from './main.js';
import { Args } from './types.js';
import parseArgumentsIntoOptions from './utils/parse-arguments-into-options.js';
import promptForMissingOptions from './utils/prompt-for-missing-options.js';

export default async function cli(rawArgs: Args) {
  let options = parseArgumentsIntoOptions(rawArgs);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
