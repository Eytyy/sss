import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from '../context/AppContext';

import Project from '../components/Project';
import EditViews from '../components/EditViews';
import CreateViews from '../components/CreateViews';

export default function Scaffold() {
  const { view, mode, setProject } = useAppContext();
  const { id } = useParams();

  useEffect(() => {
    if (id) setProject(id);
  }, [id]);

  if (mode === 'create') {
    return <CreateViews view={view} />;
  }

  if (mode === 'edit') {
    return <EditViews view={view} />;
  }

  return <Project />;
}
