import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { schemaTypes } from '../schema-types';
import {
  CustomChangeEvent,
  FieldValue,
  SchemaField,
  ChangeEvent,
  FieldProps,
  OptionProps,
} from '../types';
import Options from '../components/Options';
import { getSchema, reduceOptionsToFields } from '../lib/helpers';
import { useAppContext } from '../context/AppContext';
import Button from './Button';

const views = ['create', 'options', 'actions'] as const;

type View = typeof views[number];

type FieldStateProps = {
  field: Omit<SchemaField, '_id'>;
  activeView: View;
};

const initFieldState = {
  field: {
    type: '',
    name: '',
    hidden: false,
    readonly: false,
    description: '',
  },
  activeView: views[0],
};

export default function CreateField() {
  const [state, setState] = useState<FieldStateProps>(initFieldState);
  const { field, activeView } = state;
  const { type, name, options, ...fieldProps } = field;

  const { createField } = useAppContext();

  const ref = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  useEffect(() => ref?.current?.focus(), []);

  const onEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return void 0;
    typeRef?.current?.focus();
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({
      ...state,
      field: { ...state.field, name: e.target.value },
    }));
  };

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const type = getSchema(value);
    if (!type) return void 0;

    const props = reduceOptionsToFields(type.props) as FieldProps;
    const options = type.options && reduceOptionsToFields(type.options);

    setState((state) => ({
      ...state,
      activeView: 'actions',
      field: {
        name: state.field.name,
        type: value,
        ...props,
        options,
      },
    }));

    if (e.target.value === '') {
      setState((state) => ({
        ...state,
        field: {
          ...state.field,
          type: e.target.value,
        },
        activeView: 'create',
      }));
      return void 0;
    }
  };

  const onChangeProp = (e: ChangeEvent | CustomChangeEvent) => {
    const name = e.target.name as keyof FieldProps;
    const value = e.target.value;

    setState((state) => ({
      ...state,
      field: {
        ...state.field,
        [name]: typeof value === 'boolean' ? !state.field[name] : value,
      },
    }));
  };

  const onChangOption = (e: ChangeEvent | CustomChangeEvent) => {
    const name = e.target.name;
    const value = e.target.value as FieldValue;

    if (!options) return void 0;
    const update = {
      [name]: typeof value === 'boolean' ? !options[name] : value,
    };

    setState((state) => ({
      ...state,
      field: {
        ...state.field,
        options: { ...state.field.options, ...update },
      },
    }));
  };

  const onAddField = () => {
    createField({
      ...state.field,
      ...fieldProps,
      options: options || {},
    });
    setState({ ...initFieldState });
  };

  const onShowOptions = () =>
    setState((state) => ({ ...state, activeView: 'options' }));

  const types = schemaTypes;
  const schemaType = getSchema(field.type);
  const showProps = schemaType && schemaType.props;
  const showOptions = schemaType && schemaType.options && options;

  return (
    <motion.div className="flex flex-col gap-4">
      <div className="sticky top-[88px] z-10 grid gap-4">
        <div className="grid">
          <label className="text-sm font-bold" htmlFor="field-name">
            create new field
          </label>
          <input
            id="field-name"
            className="rounded-lg border-4 border-orange-400 bg-white text-2xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            name="name"
            ref={ref}
            type="text"
            placeholder="Field name"
            onKeyDown={onEnter}
            value={name.replaceAll(' ', '_')}
            onChange={onChangeName}
          />
        </div>
        <select
          ref={typeRef}
          disabled={name === ''}
          className="rounded-lg border-0 bg-orange-400 text-3xl capitalize focus:border-orange-400 focus:ring-1 focus:ring-orange-400 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-300"
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
      {activeView == 'options' && (
        <div className="p-1">
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
            <Button color="green" onClick={onAddField}>
              Add Field
            </Button>
          </div>
        </div>
      )}
      {activeView === 'actions' && (
        <div className="grid gap-4 text-3xl">
          <Button color="blue" onClick={onShowOptions}>
            Add Options
          </Button>
          <Button color="green" onClick={onAddField}>
            Add Field
          </Button>
        </div>
      )}
    </motion.div>
  );
}
