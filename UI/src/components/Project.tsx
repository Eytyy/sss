import { useAppContext } from '../context/AppContext';
import { ProjectProps, SchemaProps } from '../types';
import Close from './Close';
import Pill from './Pill';
import NotFound from './404';
import Output from './Output';

export default function Project() {
  const { projects, projectID } = useAppContext();

  const project = projects.find((p) => p._id === projectID);
  if (!project) return <NotFound />;

  return (
    <div>
      <Header project={project} />
      <div className="main">
        <Output schemas={project.schemas} />
      </div>
    </div>
  );
}

function Header({ project }: { project: ProjectProps }) {
  const { switchView } = useAppContext();
  const { schemas, _id } = project;

  return (
    <header className="header">
      <div className="header-inner gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Pill
            title={project.name}
            color="black"
            active={true}
            onClick={() => switchView({ view: 'project', mode: 'edit', _id })}
          />
          {schemas?.map((schema) => (
            <Schema
              key={schema._id}
              schema={schema}
              projectID={_id}
              noOfSchemas={project.schemas.length}
            />
          ))}
        </div>
        <div className="flex cursor-pointer gap-4 ">
          <Close />
        </div>
      </div>
    </header>
  );
}

function Schema({
  schema,
  projectID,
}: {
  schema: SchemaProps;
  noOfSchemas: number;
  projectID: string;
}) {
  const { switchView } = useAppContext();

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
      <Pill
        fill
        active={false}
        title={schema.name}
        color="purple"
        onClick={onClick}
      />
    </>
  );
}
