import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { useAppContext } from '../context/AppContext';
import { SchemaProps } from '../types';
import CreateField from './CreateField';
import Button from './Button';
import Pill from './Pill';
import Close from './Close';

const views = ['rename', 'create'] as const;
type View = typeof views[number];

export default function EditSchema() {
  const { getSchema } = useAppContext();
  const schema = getSchema();
  if (!schema) {
    return <div>🤔 could not find schema data</div>;
  }

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => ref?.current?.focus(), []);

  const [state, setState] = useState<SchemaProps>(schema);
  const [activeView, setActiveView] = useState<View>('rename');

  const { name } = state;

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({ ...state, name: e.target.value }));
  };

  const toggleView = (view: View) => setActiveView(view);

  const showSchemaInput = activeView === 'rename';
  const showCreateField = activeView === 'create';

  return (
    <>
      <Header schema={schema} toggleView={toggleView} activeView={activeView} />
      <div className="main">
        <div className="main-inner auto-rows-min items-start gap-8">
          {showSchemaInput && (
            <SchemaInput value={name} onChange={onChangeName} />
          )}
          {showCreateField && <CreateField />}
        </div>
      </div>
      <Footer />
    </>
  );
}

function SchemaInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const { updateSchema } = useAppContext();

  return (
    <div className="grid gap-4">
      <div className="grid">
        <label className="text-sm font-bold" htmlFor="schena-name">
          schema name
        </label>
        <input
          id="schema-name"
          className="rounded-lg border-4 border-purple-600 bg-white text-3xl focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
          name="name"
          ref={ref}
          type="text"
          placeholder="Schema name"
          value={value.replaceAll(' ', '_')}
          onChange={onChange}
        />
      </div>
      <Button color="purple" onClick={() => updateSchema(value)}>
        update
      </Button>
    </div>
  );
}

function Header({
  activeView,
  schema,
  toggleView,
}: {
  activeView: View;
  schema: SchemaProps;
  toggleView: (view: View) => void;
}) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="flex flex-wrap items-center gap-4">
          <Pill
            title={schema.name}
            color="purple"
            active={activeView === 'rename'}
            onClick={() => toggleView('rename')}
          />

          {schema.fields.map((f) => (
            <Field key={f._id} {...f} />
          ))}
          <Pill
            color="yellow"
            active={activeView === 'create'}
            onClick={() => toggleView('create')}
          />
        </div>
        <Close />
      </div>
    </header>
  );
}

function Field({ _id, name }: { _id: string; name: string }) {
  const { temp, switchView } = useAppContext();
  function onClick(_id: string) {
    if (!temp || temp.view !== 'schema') return;
    switchView({
      mode: 'edit',
      view: 'field',
      _id,
      projectID: temp.projectID,
      schemaID: temp._id,
    });
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-2 font-bold"
      onClick={() => onClick(_id)}
    >
      <motion.div className="h-5 w-5 rounded-full  bg-orange-400" />
      {name}
    </div>
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
          <div className="text-l font-bold text-red-500">delete schema</div>
        </div>
        <div
          onClick={restorePrevious}
          className="flex cursor-pointer items-center gap-4"
        >
          <div className="text-xl font-bold text-green-500">continue</div>
        </div>
      </div>
    </footer>
  );
}
