import { defaultProps } from './defaultProps';

export default {
  type: 'array',
  props: [
    {
      name: 'of',
      type: 'array:types',
      description: 'Defines which types are allowed as members of the array.',
    },
    ...defaultProps,
  ],
  options: [
    {
      name: 'sortable',
      type: 'boolean',
      default: true,
      description: `EControls whether the user is allowed to reorder the items in the array. Defaults to true.`,
    },
    {
      name: 'layout',
      type: 'string',
      choices: ['tags', 'grid'],
      default: 'switch',
      description:
        'If set to tags, renders the array as a single, tokenized input field. This option only works if the array contains strings. If set to grid it will display in a grid. If the array uses the list option, it will display the values as a vertical list of checkboxes. Use grid layout to place the checkboxes horizontally.',
    },
    {
      name: 'list',
      type: 'array:stringOrObject',
      typeStructure: {
        props: [
          { name: 'title', type: 'string' },
          { name: 'value', type: 'string' },
        ],
      },
      description:
        'Renders checkboxes for a predefined list of values. For arrays of primitives the following formats are supported: [ {value: <value>, title: <title>}, { … } ] [ <value1>, <value2>, … ] For arrays of objects the format is [ {_type: <mandatory-object-type>, _key: <optional-key>, /* optionally any fields that exist in <object-type>*/}, { … } ] Objects will be rendered using the object types preview config',
    },
    {
      name: 'modal',
      type: 'object',
      props: [
        { name: 'type', type: 'string' },
        { name: 'width', type: 'number' },
      ],
      description:
        'Controls how the modal (dialog for array content editing) is rendered. Takes an object with type and width property. type can be dialog or popover, width can be "auto" or a number. Default is {type: "dialog, width: "auto"}.',
    },
  ],
};
