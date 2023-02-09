import inquirer from 'inquirer';
import { Options } from '../types.js';

export default async function promptForMissingOptions(
  options: Options
): Promise<Options> {
  const defaultTemplate = 'micro-site';
  const defaultProjectName = 'next-sanity-app';

  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
      project: options.project || defaultProjectName,
    };
  }

  const questions = [];
  if (!options.project) {
    questions.push({
      type: 'input',
      name: 'project',
      message: 'Project name',
    });
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    template: options.template || answers.template,
    project: options.project || answers.project,
    git: options.git || answers.git,
  };
}
