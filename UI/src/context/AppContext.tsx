import { createContext, ReactNode, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { ProjectProps, SchemaField, SchemaProps } from '../types';
import reducer, { initialState, Mode, Temp, View } from './reducer';

type ContextProps = {
  projects: ProjectProps[];
  projectID: string;
  schemaID: string;
  temp: Temp;
  mode: Mode;
  view: View;
  setProject: (id: string) => void;
  createProject: (id: string) => void;
  updateProject: (id: string) => void;
  getProject: (id?: string) => ProjectProps | undefined;

  createSchema: (id: string) => void;
  updateSchema: (id: string) => void;
  getSchema: () => SchemaProps | undefined;

  createField: (field: Omit<SchemaField, '_id'>) => void;
  updateField: (field: SchemaField) => void;
  deleteField: () => void;
  getField: () => SchemaField | undefined;

  switchView: (opts: SwitchEditView | SwitchCreateView) => void;
  restorePrevious: () => void;
  reset: () => void;
};

const Context = createContext<ContextProps | null>(null);

export default function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  function setProject(id: string) {
    dispatch({ type: 'SET_PROJECT', payload: id });
  }

  function createProject(name: string) {
    dispatch({
      type: 'CREATE_PROJECT',
      payload: { _id: uuid(), name, schemas: [] },
    });
  }

  function createSchema(name: string) {
    dispatch({
      type: 'CREATE_SCHEMA',
      payload: { name, _id: uuid(), fields: [] },
    });
  }

  function createField(field: Omit<SchemaField, '_id'>) {
    dispatch({
      type: 'CREATE_FIELD',
      payload: {
        ...field,
        _id: uuid(),
      },
    });
  }

  function updateField(field: SchemaField) {
    dispatch({ type: 'UPDATE_FIELD', payload: field });
  }

  function deleteField() {
    console.log('delete field');
  }

  function getProject(id?: string) {
    return state.projects.find((p) => p._id === id);
  }

  function updateProject(name: string) {
    dispatch({ type: 'UPDATE_PROJECT', payload: name });
  }

  function getSchema() {
    const { projects, temp } = state;
    if (temp?.view === 'schema') {
      return projects
        ?.find((p) => p._id === temp.projectID)
        ?.schemas.find((schema) => schema._id === temp._id);
    }
    return void 0;
  }

  function updateSchema(name: string) {
    dispatch({ type: 'UPDATE_SCHEMA', payload: name });
  }

  function getField() {
    const { projects, temp } = state;
    if (temp?.view === 'field') {
      return projects
        ?.find((p) => p._id === temp.projectID)
        ?.schemas.find((schema) => schema._id === temp.schemaID)
        ?.fields.find((f) => f._id === temp._id);
    }
    return void 0;
  }

  function switchView(opts: SwitchEditView | SwitchCreateView) {
    dispatch({ type: 'SWITCH_VIEW', payload: opts });
  }

  function restorePrevious() {
    dispatch({
      type: 'RESTORE_PREV',
    });
  }

  function reset() {
    dispatch({ type: 'RESET_ACTION' });
    navigate('/');
  }

  return (
    <Context.Provider
      value={{
        ...state,
        setProject,
        createProject,
        updateProject,
        getProject,

        createSchema,
        updateSchema,
        getSchema,

        createField,
        updateField,
        deleteField,
        getField,

        switchView,
        restorePrevious,
        reset,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAppContext() {
  const context = useContext(Context);
  if (context === null) {
    throw new Error('useAppContext must be used withing a AppContext');
  }
  return context;
}
