import { defaultProps } from './defaultProps';

export default {
  type: 'date',
  props: [...defaultProps],
  options: [
    {
      name: 'dateFormat',
      type: 'string',
      default: 'YYYY-MM-DD.',
      description:
        'Controls how the date input field formats the displayed date. Use any valid Moment format option. Default is YYYY-MM-DD.',
    },
  ],
};
