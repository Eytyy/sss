import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { ProjectProps } from '../types';
import Button from './Button';
import Pill from './Pill';
import SchemaCreate from './SchemaCreate';
import Close from './Close';

const views = ['rename', 'create'] as const;
type View = typeof views[number];

export default function EditProject() {
  const { getProject, projectID } = useAppContext();
  const project = getProject(projectID);
  if (!project) {
    return <div>🤔 could not find project data</div>;
  }

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => ref?.current?.focus(), []);

  const [state, setState] = useState<ProjectProps>(project);
  const [activeView, setActiveView] = useState<View>('rename');

  const { name } = state;

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => ({ ...state, name: e.target.value }));
  };

  const toggleView = (view: View) => setActiveView(view);

  const showProjectInput = activeView === 'rename';
  const showCreateSchemas = activeView === 'create';

  return (
    <>
      <Header
        project={project}
        toggleView={toggleView}
        activeView={activeView}
      />
      <div className="main">
        <div className="main-inner auto-rows-min items-start gap-8">
          {showProjectInput && (
            <ProjectInput value={name} onChange={onChangeName} />
          )}
          {showCreateSchemas && <SchemaCreate />}
        </div>
      </div>
      <Footer />
    </>
  );
}

function ProjectInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const { updateProject } = useAppContext();

  return (
    <div className="grid gap-4">
      <div className="grid">
        <label className="text-sm font-bold" htmlFor="schena-name">
          project name
        </label>
        <input
          id="schema-name"
          className="rounded-lg border-4 border-black bg-white text-3xl focus:border-black focus:ring-1 focus:ring-black"
          name="name"
          ref={ref}
          type="text"
          placeholder="Schema name"
          value={value.replaceAll(' ', '_')}
          onChange={onChange}
        />
      </div>
      <Button color="purple" onClick={() => updateProject(value)}>
        update
      </Button>
    </div>
  );
}

function Header({
  activeView,
  project,
  toggleView,
}: {
  activeView: View;
  project: ProjectProps;
  toggleView: (view: View) => void;
}) {
  return (
    <header className="header">
      <div className="header-inner gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Pill
            title={project.name}
            color="black"
            active={activeView === 'rename'}
            onClick={() => toggleView('rename')}
          />

          {project.schemas.map((s) => (
            <Schema key={s._id} {...s} />
          ))}
          <Pill
            color="purple"
            active={activeView === 'create'}
            onClick={() => toggleView('create')}
          />
        </div>
        <Close />
      </div>
    </header>
  );
}

function Schema({ _id, name }: { _id: string; name: string }) {
  const { projectID, switchView } = useAppContext();
  function onClick(_id: string) {
    switchView({
      mode: 'edit',
      view: 'schema',
      _id,
      projectID,
    });
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-2 font-bold"
      onClick={() => onClick(_id)}
    >
      <motion.div className="h-5 w-5 rounded-full bg-purple-600" />
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
          <div className="text-l font-bold text-red-500">delete project</div>
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
