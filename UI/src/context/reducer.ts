import { findInArray } from '../lib/helpers';
import { ProjectProps, SchemaField, SchemaProps } from '../types';

const modes = ['display', 'edit', 'create'] as const;

export type Mode = typeof modes[number];

const create_views = ['project', 'schema', 'field'] as const;
const edit_views = ['project', 'schema', 'field'] as const;

export type CreateView = typeof create_views[number];
type EditView = typeof edit_views[number];

export type View = CreateView | EditView;

type TempField = {
  view: 'field';
  _id: string;
  projectID: string;
  schemaID: string;
};

type TempSchema = { view: 'schema'; _id: string; projectID: string };

export type Temp = TempField | TempSchema | null;

type InitialState = {
  projects: ProjectProps[];
  projectID: string;
  schemaID: string;
  temp: Temp;
  mode: Mode;
  view: CreateView | EditView;
  prev: {
    projectID: string;
    schemaID: string;
    mode: Mode;
    view: CreateView | EditView;
    temp: Temp;
  };
};

export const initialState: InitialState = {
  projects: [],
  projectID: '',
  schemaID: '',
  temp: null,
  mode: 'create' as Mode,
  view: 'project',
  prev: {
    projectID: '',
    schemaID: '',
    mode: 'create',
    view: 'project',
    temp: null,
  },
};

export default function reducer(
  state = initialState,
  action: SiteActions
): InitialState {
  switch (action.type) {
    case 'SET_PROJECT': {
      return {
        ...state,
        projectID: action.payload,
        view: 'project',
        mode: 'display',
      };
    }
    case 'CREATE_PROJECT': {
      const project = action.payload;
      return {
        ...state,
        projectID: project._id,
        projects: [...state.projects, project],
      };
    }
    case 'UPDATE_PROJECT': {
      const { projects, projectID } = state;

      return {
        ...state,
        projects: projects.map((p) => {
          if (p._id === projectID) {
            return { ...p, name: action.payload };
          }
          return p;
        }),
      };
    }
    case 'CREATE_SCHEMA': {
      const schema = action.payload;
      return {
        ...state,
        schemaID: schema._id,
        projects: state.projects.map((p) => {
          if (p._id === state.projectID) {
            return { ...p, schemas: [...p.schemas, schema] };
          }
          return p;
        }),
      };
    }
    case 'UPDATE_SCHEMA': {
      const { projects, projectID, schemaID } = state;

      return {
        ...state,
        projects: projects.map((p) => {
          if (p._id === projectID) {
            return {
              ...p,
              schemas: p.schemas.map((s) => {
                if (s._id === schemaID) {
                  return {
                    ...s,
                    name: action.payload,
                  };
                }
                return s;
              }),
            };
          }
          return p;
        }),
      };
    }
    case 'CREATE_FIELD': {
      const field = action.payload;
      const { projects, projectID, schemaID } = state;
      return {
        ...state,
        projects: projects.map((project) => {
          if (project._id === projectID) {
            return {
              ...project,
              schemas: project.schemas.map((schema) => {
                if (schema._id === schemaID) {
                  return { ...schema, fields: [...schema.fields, field] };
                }
                return schema;
              }),
            };
          }
          return project;
        }),
      };
    }
    case 'UPDATE_FIELD': {
      const field = action.payload;
      const { projects, projectID, schemaID } = state;

      const { index: pIdx, item: p } = findInArray<ProjectProps>(
        projects,
        projectID
      );
      if (!p) return state;

      const { index: sIdx, item: s } = findInArray<SchemaProps>(
        p.schemas,
        schemaID
      );
      if (!s) return state;

      const { index: fIdx, item: f } = findInArray<SchemaField>(
        s.fields,
        field._id
      );
      if (!f) return state;

      // TODO: Refactor later
      return {
        ...state,
        projects: projects.map((project) => {
          if (project._id === projectID) {
            return {
              ...project,
              schemas: project.schemas.map((schema) => {
                if (schema._id === schemaID) {
                  return {
                    ...schema,
                    fields: schema.fields.map((f) => {
                      if (f._id === field._id) return field;
                      return f;
                    }),
                  };
                }
                return schema;
              }),
            };
          }
          return project;
        }),
      };
    }
    case 'SWITCH_VIEW': {
      // when create new schema update schemaID to an empty string, maybe hsould keep track of previous step / view / mode
      const { view, mode } = action.payload;

      const updatedState = {
        ...state,
        mode,
        view,
        prev: {
          mode: state.mode,
          view: state.view,
          projectID: state.projectID,
          schemaID: state.schemaID,
          temp: state.temp,
        },
      };

      if (mode === 'edit' && view === 'field') {
        return {
          ...updatedState,
          schemaID: action.payload.schemaID,
          projectID: action.payload.projectID,
          temp: {
            view,
            _id: action.payload._id,
            projectID: action.payload.projectID,
            schemaID: action.payload.schemaID,
          },
        };
      }

      if (mode === 'edit' && view === 'schema') {
        return {
          ...updatedState,
          schemaID: action.payload._id,
          projectID: action.payload.projectID,
          temp: {
            view,
            _id: action.payload._id,
            projectID: action.payload.projectID,
          },
        };
      }

      if (mode === 'create' && view === 'schema') {
        return {
          ...state,
          view,
          mode,
          prev: {
            ...state.prev,
            schemaID: '',
            view,
            mode,
          },
        };
      }

      return {
        ...state,
        view,
        mode,
        prev: {
          mode: state.mode,
          view: state.view,
          projectID: state.projectID,
          schemaID: state.schemaID,
          temp: state.temp,
        },
      };
    }
    case 'RESTORE_PREV': {
      const { prev } = state;
      return {
        ...state,
        view: prev.view,
        mode: prev.mode,
        projectID: prev.projectID,
        schemaID: prev.schemaID,
        temp: prev.temp,
        prev: {
          projectID: '',
          schemaID: '',
          mode: 'create',
          view: 'project',
          temp: null,
        },
      };
    }
    case 'RESET_ACTION': {
      return {
        projects: state.projects,
        view: 'project',
        mode: 'create',
        projectID: '',
        schemaID: '',
        temp: null,
        prev: {
          projectID: '',
          schemaID: '',
          mode: 'create',
          view: 'project',
          temp: null,
        },
      };
    }
    default:
      return state;
  }
}
