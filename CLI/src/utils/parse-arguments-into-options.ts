import arg from 'arg';
import { Args, Options } from '../types.js';

export default function parseArgumentsIntoOptions(
  rawArgs: Args
): Options {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '--tempalte': String,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
      '-t': '--template',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    runInstall: args['--install'] || true,
    project: args._[0],
    template: args['--tempalte'] || 'micro-site',
    targetDirectory: undefined,
    templateDirectory: undefined,
  };
}

// Options
//   -y, --yes Use unattended mode, accepting defaults and using only flags for choices
//   --project <projectId> Project ID to use for the studio
//   --organization <organizationId> Organization ID to use for the project
//   --dataset <dataset> Dataset name for the studio
//   --dataset-default Set up a project with a public dataset named "production"
//   --output-path <path> Path to write studio project to
//   --template <template> Project template to use [default: "clean"]
//   --provider <provider> Login provider to use
//   --visibility <mode> Visibility mode for dataset (public/private)
//   --create-project <name> Create a new project with the given name
//   --project-plan <name> Optionally select a plan for a new project
//   --coupon <name> Optionally select a coupon for a new project (cannot be used with --project-plan)
//   --reconfigure Reconfigure Sanity studio in current folder with new project/dataset
//   --no-typescript Do not use TypeScript for template files
