import chalk from 'chalk';
import { execa } from 'execa';
import path from 'path';
import fsp from 'fs/promises';

export default async function installPackages(
  options: {
    targetDirectory: string;
    templateDirectory: string;
    project: string;
  },
  target: 'studio' | '' = ''
) {
  console.log(`%s Installing packages`, chalk.green.bold(`START`));
  try {
    const frontend_packages = path.resolve(
      options.templateDirectory,
      target,
      'package.json'
    );
    const file = await fsp.readFile(frontend_packages, 'utf8');
    const parsed = JSON.parse(file);
    const packages = Object.entries(parsed.dependencies).map(
      ([key, value]) => {
        return `${key}@${value}`;
      }
    );

    await execa('npm', ['install', ...packages], {
      cwd: options.targetDirectory,
      stderr: 'inherit',
      stdout: 'inherit',
      stdin: 'inherit',
    });

    console.log(`%s Installed packages`, chalk.green.bold(`DONE`));
  } catch (err) {
    console.error(
      '%s Failed to install packages ',
      chalk.red.bold('ERROR')
    );
  }
  return;
}
