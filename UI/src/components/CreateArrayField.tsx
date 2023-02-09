import { useState } from 'react';
import { motion } from 'framer-motion';
import { schemaTypes } from '../schema-types';
import {
  CustomChangeEvent,
  FieldValue,
  ChangeEvent,
  SchemaField,
  FieldProps,
  OptionProps,
} from '../types';
import Options from '../components/Options';
import { getSchema, reduceOptionsToFields } from '../lib/helpers';
import Button from './Button';

const initFieldState = {
  _id: '',
  type: '',
  name: '',
  hidden: false,
  readonly: false,
  description: '',
};

type CreateArrayFieldProps = {
  onAdd: (field: SchemaField) => void;
  allowNestedArrays: boolean;
};
export default function CreateArrayField({
  onAdd,
  allowNestedArrays,
}: CreateArrayFieldProps) {
  const [field, setField] = useState<SchemaField>(initFieldState);
  const { _id, type, name, options, ...fieldProps } = field;

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField((state) => ({
      ...state,
      name: e.target.value,
    }));
  };

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === '') {
      setField((state) => ({ ...state, type: value }));
      return void 0;
    }

    const type = getSchema(value);
    if (!type) return void 0;

    const props = reduceOptionsToFields(type.props) as FieldProps;
    const options = type.options && reduceOptionsToFields(type.options);

    setField((state) => ({
      _id: state._id,
      name: state.name,
      type: value,
      ...props,
      options: options,
    }));

    if (e.target.value === '') {
      setField((state) => ({
        ...state,
        type: e.target.value,
      }));
      return void 0;
    }
  };

  const onChangeProp = (e: ChangeEvent | CustomChangeEvent) => {
    const name = e.target.name as keyof FieldProps;
    const value = e.target.value;

    setField((state) => ({
      ...state,
      [name]: typeof value === 'boolean' ? !state[name] : value,
    }));
  };

  const onChangOption = (e: ChangeEvent | CustomChangeEvent) => {
    const name = e.target.name;
    const value = e.target.value as FieldValue;

    if (!options) return void 0;
    const update = {
      [name]: typeof value === 'boolean' ? !options[name] : value,
    };

    setField((state) => ({
      ...state,
      options: { ...state.options, ...update },
    }));
  };

  function AddField() {
    onAdd(field);
    setField(initFieldState);
  }

  const types = allowNestedArrays
    ? schemaTypes
    : schemaTypes.filter((t) => t.type !== 'array');

  const schemaType = getSchema(type);
  const showProps = schemaType && schemaType.props;
  const showOptions = schemaType && schemaType.options && options;

  return (
    <motion.div className="flex flex-col gap-4 bg-gray-200 p-4">
      <div className="grid gap-4">
        <div className="grid">
          <input
            id="field-name"
            className="rounded-lg border-4 border-orange-400 bg-white text-2xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            name="name"
            type="text"
            placeholder="Field name"
            value={name.replaceAll(' ', '_')}
            onChange={onChangeName}
          />
        </div>
        <select
          disabled={name === ''}
          className="rounded-lg border-0 bg-orange-400 text-2xl capitalize focus:border-orange-400 focus:ring-1 focus:ring-orange-400 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-300"
          name="type"
          onChange={onChangeType}
          value={type}
        >
          <option value="">select type</option>
          {types.map(({ type }) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {schemaType && (
        <>
          <div>
            {showProps && (
              <Options
                type={schemaType.type}
                options={schemaType.props}
                optionsValues={fieldProps}
                onChange={onChangeProp}
              />
            )}
            {showOptions && (
              <Options
                type={schemaType.type}
                options={schemaType.options as OptionProps[]}
                optionsValues={options}
                onChange={onChangOption}
              />
            )}
            <div className="sticky bottom-[-88px] w-full">
              <Button color="green" onClick={AddField}>
                Add Field
              </Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
