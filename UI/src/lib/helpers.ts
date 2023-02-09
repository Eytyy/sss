import { schemaTypes } from '../schema-types';
import {
  FieldOptionValues,
  FieldValue,
  OptionProps,
  SchemaType,
} from '../types';

export function findInArray<T extends { _id: string }>(
  store: T[],
  id: string
): {
  index: number;
  item: T | undefined;
} {
  const index = store.findIndex((p) => p._id === id);
  return {
    index,
    item: store[index],
  };
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function getFieldValue(field: OptionProps) {
  switch (field.type) {
    case 'array':
    case 'array:types':
    case 'array:object':
      return [];
    case 'boolean':
      return false;
    case 'number':
      return 0;
    case 'object': {
      const props: { [key: string]: string | number } = field.props.reduce(
        (props, prop) => {
          return {
            ...props,
            [prop.name]: prop.type === 'number' ? 0 : '',
          };
        },
        {}
      );
      return props;
    }
    default:
      return '';
  }
}

function removeEmptyProps(obj: { [key: string]: any }) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return value === 0 || value == '' ? acc : { ...acc, [key]: value };
  }, {});
}

export function cleanProps(props: { [key: string]: FieldOptionValues }) {
  const cleanedProps: { [key: string]: FieldOptionValues } = {};
  Object.entries(props).forEach(([key, value]) => {
    if (
      (typeof value === 'boolean' && value !== false) ||
      (typeof value === 'string' && value !== '') ||
      (Array.isArray(value) && value.length !== 0)
    ) {
      cleanedProps[key] = value;
    } else if (
      typeof value === 'object' &&
      value !== null &&
      Object.keys(value).length !== 0
    ) {
      cleanedProps[key] = removeEmptyProps(value);
    }
  });
  return cleanedProps;
}

export function reduceOptionsToFields(options: OptionProps[]) {
  return options.reduce((obj, field) => {
    obj[field.name] = getFieldValue(field) as FieldValue;
    return obj;
  }, {} as { [key: string]: FieldValue });
}

export function getSchema(type: string) {
  return schemaTypes.find((schema) => schema.type === type) as
    | SchemaType
    | undefined;
}

const colors = ['black', 'purple', 'yellow', 'green', 'blue'] as const;
export type Color = typeof colors[number];

export function getColorClassNames(color: Color) {
  switch (color) {
    case 'blue':
      return {
        text: 'text-blue-600',
        bg: 'bg-blue-600',
        border: 'border-blue-600',
      };
    case 'green':
      return {
        text: 'text-green-500',
        bg: 'bg-green-500',
        border: 'border-green-500',
      };
    case 'purple':
      return {
        text: 'text-purple-600',
        bg: 'bg-purple-600',
        border: 'border-purple-600',
      };
    case 'yellow':
      return {
        text: 'text-orange-400',
        bg: 'bg-orange-400',
        border: 'border-orange-400',
      };
    default:
      return {
        text: 'text-black',
        bg: 'bg-black',
        border: 'border-black',
      };
  }
}
