import schemaTemplate, { schemasMain } from '../schema-template.js';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { execa } from 'execa';

export default async function generateSchemas(options) {
  const generateSchema = (schema) => schemaTemplate(schema);
  const schemas = JSON.parse(
    await fs.readFile(
      path.resolve(process.cwd(), 'schemas.json'),
      'utf-8'
    )
  );

  // create the schemas directory
  const schemaPath = path.resolve(process.cwd(), 'studio', 'schemas');

  // although this is not needed; create it just incase the sanity cli fails
  // since it won't through an error if the directory exists anyway
  await fs.mkdir(schemaPath, { recursive: true }).catch((e) => {
    console.log('🤔');
    console.log(e);
  });

  await generateMain(schemaPath, schemas);

  // write the schemas
  schemas.forEach(async (schema) => {
    const schemaName = schema.name;
    try {
      await fs.writeFile(
        path.resolve(schemaPath, `${schemaName}.js`),
        generateSchema(schema)
      );
    } catch (e) {
      console.log(`${chalk.red.bold('Error:')} ${e.message}`);
    }
  });
}

async function generateMain(schemaPath, schemas) {
  try {
    await fs.writeFile(
      path.resolve(schemaPath, 'index.ts'),
      schemasMain(schemas)
    );
  } catch (e) {
    console.log(`${chalk.red.bold('Error:')} ${e.message}`);
  }
}
