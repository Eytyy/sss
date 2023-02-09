import { defaultProps } from './defaultProps';

export default {
  type: 'datetime',
  props: [...defaultProps],
  options: [
    {
      name: 'dateFormat',
      type: 'string',
      default: 'YYYY-MM-DD.',
      description:
        'Controls how the date input field formats the displayed date. Use any valid Moment format option. Default is YYYY-MM-DD.',
    },
    {
      name: 'timeFormat',
      type: 'string',
      default: 'HH:mm.',
      description:
        'Controls how the time input field formats the displayed date. Use any valid Moment format option. Default is HH:mm.',
    },
    {
      name: 'timeStep',
      type: 'number',
      default: 15,
      description:
        'Number of minutes between each entry in the time input. Default is 15 which lets the user choose between 09:00, 09:15, 09:30 and so on.',
    },
  ],
};
