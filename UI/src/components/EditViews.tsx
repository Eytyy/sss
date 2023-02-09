import { View } from '../context/reducer';
import EditField from './EditField';
import EditProject from './EditProject';
import EditSchema from './EditSchema';

export default function EditViews({ view }: { view: View }) {
  if (view === 'schema') {
    return <EditSchema />;
  }
  if (view === 'field') {
    return <EditField />;
  }
  return <EditProject />;
}
