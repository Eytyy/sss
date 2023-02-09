export const defaultProps = [
  {
    name: 'hidden',
    type: 'boolean',
    default: false,
    description: 'If set to true, this field will be hidden in the studio.',
  },
  {
    name: 'readonly',
    type: 'boolean',
    default: false,
    description:
      'If set to true, this field will not be editable in the content studio.',
  },
  {
    name: 'description',
    type: 'string',
    description: 'Short description to editors how the field is to be used.',
  },
];
