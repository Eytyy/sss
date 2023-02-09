import { defaultProps } from './defaultProps';

export default {
  type: 'object',
  props: [
    {
      name: 'fields',
      type: 'array:types',
      description: 'The fields of this object. At least one field is required.',
    },
    ...defaultProps,
  ],
  options: [
    {
      name: 'collapsible',
      type: 'boolean',
      description:
        'If set to true, the object will make the fields collapsible. By default, objects will be collapsible when reaching a depth/nesting level of 3. This can be overridden by setting collapsible: false',
    },
    {
      name: 'collapsed',
      type: 'boolean',
      description:
        'Set to true to display fields as collapsed initially. This requires the collapsible option to be set to true and determines whether the fields should be collapsed to begin with.',
    },
    {
      name: 'columns',
      type: 'number',
      description: `An integer corresponding to the number of columns in a grid for the inputs to flow between.`,
    },
    {
      name: 'modal',
      type: 'string',
      description:
        'Controls how the modal (for object content editing) is rendered. The types you can choose between is dialog or popover. Default is dialog. You can also set the width of the modal.',
      choices: ['dialog', 'popover'],
      default: 'dialog',
    },
    {
      name: 'accept',
      type: 'string',
      description:
        'This specifies which mime types the file input can accept. Just like the accept attribute on native DOM file inputs and you can specify any valid file type specifier:',
    },
  ],
};
