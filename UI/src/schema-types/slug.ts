import { defaultProps } from './defaultProps';

export default {
  type: 'slug',
  props: [...defaultProps],
  options: [
    {
      name: 'source',
      type: 'string',
      description:
        'The name of the field which the slug value is derived from. If a string is provided, it should match the name of the source field in your schema. If a function is provided, the source function is called with two parameters: doc (object - the current document) and options (object - with parent and parentPath keys for easy access to sibling fields).',
    },
    {
      name: 'maxLength',
      type: 'number',
      description:
        'Maximum number of characters the slug may contain when generating it from a source (like a title field) with the default slugify function. Defaults to 200. If you include your own slugify function, or manually enter your slug this option will be ignored.',
    },
  ],
};
