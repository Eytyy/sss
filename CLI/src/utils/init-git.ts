import { execa } from 'execa';

export default async function initGit(options: {
  targetDirectory: string;
}) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }
  return;
}
