import chalk from 'chalk';
import { execa } from 'execa';
import ora from 'ora';

export default async function initNext(options: {
  targetDirectory: string;
}) {
  try {
    console.log(chalk.green.bold('create-next-app'));
    await execa(
      'npx',
      [
        'create-next-app@latest',
        '.',
        '--ts',
        '--eslint',
        '--src-dir',
        '--import-alias',
      ],
      {
        cwd: options.targetDirectory,
        stderr: 'inherit',
        stdout: 'inherit',
        stdin: 'inherit',
      }
    );
  } catch (err) {
    console.error(
      '%s Failed to create next.js project',
      chalk.red.bold('ERROR')
    );
  }
  return;
}
