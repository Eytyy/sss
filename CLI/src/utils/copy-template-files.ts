import ncp from 'ncp';
import { promisify } from 'util';

const copy = promisify(ncp);

export async function copyTemplateFiles(options: {
  templateDirectory: string;
  targetDirectory: string;
}) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}
