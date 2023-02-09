const imports = (schemas) => {
    let output = ``;
    schemas.forEach((schema) => {
        output += `import ${schema.name} from './${schema.name}.js';\n`;
    });
    return output;
};
export const schemasMain = (schemas) => `${imports(schemas)}
export const schemaTypes = [${schemas.map((schema) => `${schema.name}`)}]
`;
const schemaTemplate = (schema) => `
  import {defineType, defineField} from 'sanity';
  export default defineType({
    name: '${schema.name}',
    title: '${schema.name}',
    type: 'document',
    fields: [
      ${schema.fields.map((field) => `defineField(${JSON.stringify(field, null, 2)}) `)}
    ],
  })
`;
export default schemaTemplate;
function replacer(key, value) {
    if (key === '_id')
        return undefined;
    return value;
}
const printProp = (key, value) => {
    if (typeof value === 'string') {
        return `
      ${key}: '${value}',
    `;
    }
    else if (typeof value === 'boolean') {
        return `
      ${key}: ${value},
    `;
    }
    else if (Array.isArray(value)) {
        return `
      ${key}: [${value.map((item) => `${JSON.stringify(item, replacer, 8)}`)}],
    `;
    }
};
//# sourceMappingURL=schema-template.js.map