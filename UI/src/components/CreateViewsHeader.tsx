import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { SchemaField, SchemaProps } from '../types';
import Close from './Close';
import Pill from './Pill';

export default function CreateViewsHeader() {
  const { view, mode, switchView, projectID } = useAppContext();

  return (
    <header className="sticky top-0 left-0 z-20 h-[88px] w-screen">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-8">
        <div className="flex flex-wrap items-center gap-4">
          <Pill
            color="black"
            active={view === 'project'}
            onClick={() => {
              if (view === 'project' && mode === 'create') return void 0;
              switchView({ view: 'project', mode: 'edit', _id: projectID });
            }}
          />
          <Schemas />
          {view != 'project' && (
            <>
              <Pill
                color="purple"
                active={view === 'schema'}
                onClick={() => switchView({ view: 'schema', mode: 'create' })}
              />
              <Pill
                color="yellow"
                active={view === 'field'}
                onClick={() => switchView({ view: 'field', mode: 'create' })}
              />
            </>
          )}
        </div>
        <div>
          <Close />
        </div>
      </div>
    </header>
  );
}

function Schemas() {
  const { projects, projectID } = useAppContext();
  const project = projects.find((p) => p._id === projectID);
  if (!project) return null;

  const noOfSchemas = project.schemas.length || 0;

  return (
    <>
      {project.schemas?.map((schema) => (
        <Schema
          key={schema._id}
          schema={schema}
          projectID={project._id}
          noOfSchemas={noOfSchemas}
        />
      ))}
    </>
  );
}

const schemas_variants = {
  initial: {
    background: 'rgb(255 255 255)',
    border: '4px solid rgb(147 51 234)',
    borderRadius: '100%',
  },
  filled: {
    background: 'rgb(147 51 234)',
    border: '4px solid rgb(147 51 234)',
    borderRadius: '100%',
  },
};

function Schema({
  schema,
  projectID,
  noOfSchemas,
}: {
  schema: SchemaProps;
  noOfSchemas: number;
  projectID: string;
}) {
  const { schemaID, switchView } = useAppContext();

  const variant =
    schema._id === schemaID || (schema._id !== schemaID && noOfSchemas > 0)
      ? 'filled'
      : 'initial';

  function onClick() {
    switchView({
      mode: 'edit',
      view: 'schema',
      projectID,
      _id: schema._id,
    });
  }

  const active = schema._id === schemaID;

  return (
    <>
      <div
        className="flex cursor-pointer items-center gap-2 font-bold"
        onClick={onClick}
      >
        <motion.div
          variants={schemas_variants}
          initial={{
            border: '4px solid rgb(255 255 255)',
            width: '1.25rem',
            height: '1.25rem',
            borderRadius: '0%',
          }}
          animate={variant}
        />
        {active && <span className="text-sm">{schema.name}</span>}
      </div>
      {active && (
        <SchemaFields
          fields={schema.fields}
          projectID={projectID}
          schemaID={schema._id}
        />
      )}
    </>
  );
}

// Header Fields
const feilds_variants = {
  initial: {
    background: 'rgb(255 255 255)',
    border: '4px solid rgb(251 146 60)',
    borderRadius: '100%',
  },
  filled: {
    background: 'rgb(251 146 60)',
    border: '4px solid rgb(251 146 60)',
    borderRadius: '100%',
  },
};

function SchemaFields({
  fields,
  projectID,
  schemaID,
}: {
  fields: SchemaField[] | undefined;
  projectID: string;
  schemaID: string;
}) {
  const { switchView, temp } = useAppContext();

  function onClick(_id: string) {
    if (temp?._id === _id) return;
    switchView({ mode: 'edit', view: 'field', projectID, schemaID, _id });
  }

  return (
    <>
      {fields?.map((f) => {
        return (
          <div
            key={f._id}
            className="flex cursor-pointer items-center gap-2 text-sm font-bold"
            onClick={() => onClick(f._id)}
          >
            <motion.div
              variants={feilds_variants}
              initial={{
                border: '4px solid rgb(255 255 255)',
                width: '1.25rem',
                height: '1.25rem',
                borderRadius: '0%',
              }}
              animate={f._id !== temp?._id ? 'filled' : 'initial'}
            />
            <span>{f.name}</span>
          </div>
        );
      })}
    </>
  );
}
