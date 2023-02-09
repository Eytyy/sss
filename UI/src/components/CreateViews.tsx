import { View } from '../context/reducer';
import CreateField from './CreateField';
import CreateViewsHeader from './CreateViewsHeader';
import ProjectCreate from './ProjectCreate';
import SchemaCreate from './SchemaCreate';

function renderView(view: View) {
  if (view === 'schema') {
    return <SchemaCreate />;
  }
  if (view === 'field') {
    return <CreateField />;
  }
  return <ProjectCreate />;
}

export default function CreateViews({ view }: { view: View }) {
  return (
    <>
      <CreateViewsHeader />
      <div className="main">
        <div className="main-inner">{renderView(view)}</div>
      </div>
    </>
  );
}
