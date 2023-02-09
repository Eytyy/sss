import { defaultProps } from './defaultProps';

export default {
  type: 'string',
  props: [...defaultProps],
  options: [
    {
      name: 'list',
      type: 'array:stringOrObject',
      description: 'A list of predefined values that the user can choose from.',
      typeStructure: {
        props: [
          { name: 'title', type: 'string' },
          { name: 'value', type: 'string' },
        ],
      },
    },
    {
      name: 'layout',
      type: 'string',
      choices: ['dropdown', 'radio'],
      default: 'dropdown',
      description:
        'Controls how the items defined in the list option are presented.',
    },
    {
      name: 'direction',
      type: 'string',
      choices: ['vertical', 'horizontal'],
      default: 'vertical',
      description: 'Controls how radio buttons are lined up.',
    },
  ],
};
