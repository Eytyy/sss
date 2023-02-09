import { useState } from 'react';
import Button from '../components/Button';
import Options from '../components/Options';
import { useAppContext } from '../context/AppContext';
import { getSchema, reduceOptionsToFields } from '../lib/helpers';
import { schemaTypes } from '../schema-types';
import {
  ChangeEvent,
  CustomChangeEvent,
  FieldProps,
  FieldValue,
  OptionProps,
  SchemaField,
} from '../types';

const initialState = {
  type: '',
  name: '',
  hidden: false,
  readonly: false,
  description: '',
};

const Refactor = () => {
  const { createField } = useAppContext();
  const [field, setField] = useState<Omit<SchemaField, '_id'>>(initialState);
  const { type, name, options, ...fieldProps } = field;

  function onChange(e: ChangeEvent) {
    const { value } = e.target;
    const type = getSchema(value);
    if (!type) return void 0;

    const props = reduceOptionsToFields(type.props) as FieldProps;
    const options = type.options && reduceOptionsToFields(type.options);

    setField((state) => ({
      name: state.name,
      type: value,
      ...props,
      options: options,
    }));
  }

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

  const onAddField = () => {
    createField({
      ...field,
      ...fieldProps,
      options: options || {},
    });
    setField({ ...initialState });
  };

  const schemaType = getSchema(type);
  const showProps = schemaType && schemaType.props;
  const showOptions = schemaType && schemaType.options && options;

  return (
    <div>
      <select name="type" value={type} onChange={onChange}>
        <option value=""> select type</option>
        {schemaTypes.map((s) => (
          <option key={s.type} value={s.type}>
            {s.type}
          </option>
        ))}
      </select>
      {showProps && field && (
        <Options
          type={schemaType.type}
          options={schemaType.props}
          optionsValues={fieldProps}
          onChange={(e) => onChangeProp(e)}
        />
      )}
      {showOptions && (
        <Options
          type={schemaType.type}
          options={schemaType.options as OptionProps[]}
          optionsValues={options}
          onChange={(e) => onChangOption(e)}
        />
      )}
      <div className="grid gap-4 text-3xl">
        <Button color="green" onClick={onAddField}>
          Add Field
        </Button>
      </div>
    </div>
  );
};

export default Refactor;
