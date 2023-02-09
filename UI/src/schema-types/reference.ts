import { defaultProps } from './defaultProps';

export default {
  type: 'reference',
  props: [
    {
      name: 'to',
      type: 'array:object',
      typeStructure: {
        props: [{ name: 'type', type: 'string' }],
      },
      description:
        'Required. Must contain an array naming all the types which may be referenced e.g. [{type: "person"}]. See more examples below.',
    },
    {
      name: 'weak',
      type: 'boolean',
      default: false,
      description: `Default false. If set to true the reference will be made weak. This allows references to point at documents that may or may not exist, such as a document that has not yet been published or a document that has been deleted (or indeed an entirely imagined document).`,
    },
    ...defaultProps,
  ],
  options: [
    {
      name: 'disableNew',
      type: 'boolean',
      default: false,
      description: `Disables inline creation of new documents from the reference field. Defaults to false.`,
    },
    {
      name: 'filter',
      type: 'string',
      description:
        'Additional GROQ-filter to use when searching for target documents. The filter will be added to the already existing type name clause.',
    },
    {
      name: 'filterParams',
      type: 'object',
      props: [
        {
          name: 'paramName',
          type: 'string',
        },
        {
          name: 'paramValue',
          type: 'string',
        },
      ],
      description:
        'Object of parameters for the GROQ-filter specified in filter.',
    },
  ],
};
