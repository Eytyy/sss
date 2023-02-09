import chalk from 'chalk';
import { execa } from 'execa';
import ora from 'ora';

export default async function initSanity(options: {
  targetDirectory: string;
  project: string;
}) {
  try {
    console.log('Sanity create');
    await execa(
      'npm',
      [
        'create',
        'sanity@latest',
        '--',
        '--output-path=studio',
        `--create-project=${options.project}`,
        '--template=clean',
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
      '%s Failed to create sanity project',
      chalk.red.bold('ERROR')
    );
  }
  return;
}
