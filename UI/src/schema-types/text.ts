import { defaultProps } from './defaultProps';

export default {
  type: 'text',
  props: [
    {
      name: 'rows',
      type: 'number',
      default: 10,
      description: 'The number of rows to display in the textarea.',
    },
    ...defaultProps,
  ],
};
