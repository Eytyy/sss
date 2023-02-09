import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
import Options from './Options';
import Button from './Button';
import { BiRightArrowAlt, BiTrashAlt } from 'react-icons/bi';

export default function EditField() {
  const { getField, updateField } = useAppContext();
  const fieldData = getField();
  if (!fieldData) {
    return <div>🤔 could not find field data</div>;
  }

  const [edited, setEdited] = useState(false);
  const [field, setField] = useState<SchemaField>(fieldData);
  const { type, name, options, ...fieldProps } = field;

  const ref = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  useEffect(() => ref?.current?.focus(), []);

  useEffect(() => {
    setField(field);
    if (!edited) setEdited(true);
  }, [field]);

  const onEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return void 0;
    typeRef?.current?.focus();
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField((state) => ({ ...state, name: e.target.value }));
  };

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
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

  const onUpdate = () => updateField(field);

  const types = schemaTypes;
  const schemaType = getSchema(type);
  const showProps = schemaType && schemaType.props;
  const showOptions = schemaType && schemaType.options && options;

  return (
    <>
      <Header field={field} />
      <div className="main">
        <div className="main-inner">
          <motion.div className=" bg-gray-200 p-4">
            <div className="flex flex-col gap-4">
              <input
                className="rounded-lg border-4 border-orange-500 text-3xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                name="name"
                ref={ref}
                type="text"
                placeholder="Field name"
                onKeyDown={onEnter}
                value={name.replaceAll(' ', '_')}
                onChange={onChangeName}
              />
              <select
                ref={typeRef}
                disabled={name === ''}
                className="rounded-lg border-4 border-orange-400 bg-orange-400 text-3xl capitalize focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-300"
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
            <div className=" overflow-y-scroll">
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
            </div>
          </motion.div>
          <Button onClick={onUpdate} color="black">
            update
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}

function Header({ field }: { field: SchemaField }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="flex items-center  gap-4">
          <div className="flex cursor-pointer items-center gap-2 font-bold">
            <motion.div className="h-5 w-10 rounded-md border-4 border-orange-400" />
            <span>{field.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { restorePrevious, deleteField } = useAppContext();
  return (
    <footer className="sticky bottom-0 left-0 w-screen">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-8">
        <div
          className="flex cursor-pointer items-center gap-4"
          onClick={deleteField}
        >
          <div className="text-3xl text-red-500">
            <BiTrashAlt />
          </div>
        </div>
        <div
          onClick={restorePrevious}
          className="flex cursor-pointer items-center gap-4"
        >
          <div className="text-4xl text-green-500">
            <BiRightArrowAlt />
          </div>
        </div>
      </div>
    </footer>
  );
}
