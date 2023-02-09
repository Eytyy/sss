import { defaultProps } from './defaultProps';

export default {
  type: 'file',
  props: [
    {
      name: 'fields',
      type: 'array:types',
      description:
        'An array of optional fields to add to the image record. The fields added here follow the same pattern as fields defined on objects. This is useful for adding custom properties like caption, attribution, etc., to the image record itself',
    },
    ...defaultProps,
  ],
  options: [
    {
      name: 'storeOriginalFilename',
      type: 'boolean',
      default: true,
      description:
        'This specifies which mime types the image input can accept. Just like the accept attribute on native DOM file inputs, you can specify any valid file type specifier: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers',
    },
    {
      name: 'accept',
      type: 'string',
      description:
        'This specifies which mime types the file input can accept. Just like the accept attribute on native DOM file inputs and you can specify any valid file type specifier:',
    },
    {
      name: 'sources',
      type: 'array',
      description:
        'Lock the asset sources available to this type to a specific subset. Import the plugins by their part name, and use the import variable name as array entries. The built in default asset source has the part name part:@sanity/form-builder/input/image/asset-source-default',
    },
  ],
};
