import chalk from 'chalk';
import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { copyTemplateFiles } from './utils/copy-template-files.js';
import { Listr } from 'listr2';
import initGit from './utils/init-git.js';
import { projectInstall } from 'pkg-install';
import initSanity from './utils/init-sanity.js';
import initNext from './utils/init-next.js';
import installPackages from './utils/install-packages.js';
import generateSchemas from './utils/generate-schemas.js';

type createProjectProps = {
  template: string;
  targetDirectory: string;
  templateDirectory: string;
  git: boolean;
  runInstall: boolean;
  project: string;
};

export async function createProject(options: createProjectProps) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const currentFileUrl = new URL(import.meta.url).pathname;
  const templateDir = path.resolve(
    currentFileUrl,
    '../../templates',
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  // Check if the template exists
  try {
    await fsp.access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error(
      '%s Invalid template name',
      chalk.red.bold('ERROR')
    );
    process.exit(1);
  }

  /*
  Init sanity, next, and install packages outside of Listr
  to avoid the strange behavior of Listr when passing tasks
  with an interactive cli prompt – previous stdout will
  printed multiple times and the output gets cropped.

  The order matters here, since create-next-app will complain
  if there are other files in the directory. And the other packages
  need to be installed after both sanity and next are initialized.
  */
  await initNext(options);
  await initSanity(options);
  await installPackages(options, '');

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: 'Generate Schemas',
      task: () => generateSchemas(options),
    },
  ]);

  await tasks.run();
  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
}
