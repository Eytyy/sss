import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { SchemaField, SchemaProps } from '../types';

// HeaderSchemas
export default function Schemas({ expanded }: { expanded: boolean }) {
  const { projects, projectID, schemaID } = useAppContext();
  const project = projects.find((p) => p._id === projectID);
  if (!project) return null;

  const visibleSchemas = expanded
    ? project.schemas
    : project.schemas.filter((s) => s._id === schemaID);
  const noOfSchemas = project.schemas.length || 0;

  return (
    <>
      {visibleSchemas?.map((schema) => (
        <Schema
          key={schema._id}
          schema={schema}
          projectID={project._id}
          noOfSchemas={noOfSchemas}
          expanded={expanded}
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
  expanded,
}: {
  schema: SchemaProps;
  noOfSchemas: number;
  projectID: string;
  expanded: boolean;
}) {
  const { schemaID, switchView, view, mode } = useAppContext();
  const variant =
    schema._id !== schemaID ||
    (schema._id === schemaID &&
      schema.fields.length > 0 &&
      view !== 'schema' &&
      mode !== 'edit')
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
        {expanded && <span>{schema.name}</span>}
      </div>
      <SchemaFields
        fields={schema.fields}
        expanded={expanded}
        projectID={projectID}
        schemaID={schema._id}
      />
    </>
  );
}

// Header Fields
const feilds_variants = {
  initial: {
    background: 'rgb(255 255 255)',
    border: '4px solid rgb(250 204 21)',
    borderRadius: '100%',
  },
  filled: {
    background: 'rgb(250 204 21)',
    border: '4px solid rgb(250 204 21)',
    borderRadius: '100%',
  },
};

function SchemaFields({
  fields,
  expanded,
  projectID,
  schemaID,
}: {
  fields: SchemaField[] | undefined;
  expanded: boolean;
  projectID: string;
  schemaID: string;
}) {
  const { switchView, temp } = useAppContext();

  function onClick(_id: string) {
    if (temp?._id === _id) return;

    switchView({
      mode: 'edit',
      view: 'field',
      projectID,
      schemaID,
      _id,
    });

    temp?._id;
  }

  return (
    <>
      {fields?.map((f) => {
        return (
          <div
            key={f._id}
            className="flex cursor-pointer items-center gap-2 font-bold"
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
            {expanded && <span>{f.name}</span>}
          </div>
        );
      })}
    </>
  );
}
