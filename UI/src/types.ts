export type FieldValue =
  | string
  | boolean
  | number
  | null
  | []
  | { [key: string]: string | number };

export type FieldOptionValues = FieldValue | { [key: string]: FieldValue }[];

export type SchemaType = {
  type: string;
  props: OptionProps[];
  options?: OptionProps[];
};

export type FieldProps = {
  hidden: boolean;
  readonly: boolean;
  description: string;
  of?: [];
  to?: [];
  fields?: [];
  weak?: boolean;
};

export type SchemaField = {
  _id: string;
  type: string;
  name: string;
  options?: {
    [key: string]: FieldOptionValues;
  };
} & FieldProps;

export type SchemaProps = {
  _id: string;
  name: string;
  fields: SchemaField[];
};

export type ProjectProps = {
  _id: string;
  name: string;
  schemas: SchemaProps[];
};

// Options Types
type StringOption = {
  name: string;
  type: 'string';
  description: string;
  choices?: string[];
  default?: string | boolean;
};

type BooleanOption = {
  name: string;
  type: 'boolean';
  description: string;
  default?: boolean;
};

type NumberOption = {
  name: string;
  type: 'number';
  description: string;
};

export type ObjectStructure = {
  props: { name: 'string'; type: 'string' | 'number' }[];
};

type ObjectOption = {
  name: string;
  type: 'object';
  description: string;
  props: { name: 'string'; type: 'string' | 'number' }[];
};

type ArrayOption = {
  name: string;
  type: 'array';
  description: string;
  acceptedValues?: string[];
};

type ArrayOfStringsOrObjectsOption = {
  name: string;
  type: 'array:stringOrObject';
  description: string;
  typeStructure: ObjectStructure;
};

type ArrayOfTypesOption = {
  name: string;
  type: 'array:types';
  description: string;
};

type ArrayOfObjectsOption = {
  name: string;
  type: 'array:object';
  description: string;
  typeStructure: ObjectStructure;
};

export type OptionProps =
  | StringOption
  | BooleanOption
  | NumberOption
  | ObjectOption
  | ArrayOption
  | ArrayOfStringsOrObjectsOption
  | ArrayOfTypesOption
  | ArrayOfObjectsOption;

// Events' Type
export type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

// Change events return values as strings
// this custom type is for overridden change events
// that return values as boolean or arrays
export type CustomChangeEvent = {
  target: {
    name: string;
    value:
      | string[]
      | { [key: string]: string | number }[]
      | { [key: string]: string | number }
      | SchemaField[]
      | boolean
      | string
      | null;
  };
};

export type onChangeCb = (e: ChangeEvent) => void;
export type onCustomChangeCb = (e: CustomChangeEvent) => void;
