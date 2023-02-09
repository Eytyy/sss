export type Args = string[];

export type Options = {
  skipPrompts: boolean;
  git: boolean;
  template: string;
  runInstall: boolean;
  targetDirectory: string;
  templateDirectory: string;
  project: string;
};
