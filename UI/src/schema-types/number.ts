import { defaultProps } from './defaultProps';

export default {
  type: 'number',
  props: [...defaultProps],
  options: [
    {
      name: 'list',
      type: 'array:stringOrObject',
      description: 'A list of predefined values that the user can choose from.',
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
