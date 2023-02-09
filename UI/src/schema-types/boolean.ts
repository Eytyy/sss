import { defaultProps } from './defaultProps';

export default {
  type: 'boolean',
  props: [...defaultProps],
  options: [
    {
      name: 'layout',
      type: 'string',
      choices: ['switch', 'checkbox'],
      default: 'switch',
      description:
        'This lets you control the visual appearance of the input. By default the input for boolean fields will display as a switch, but you can also make it appear as a checkbox.',
    },
  ],
};
