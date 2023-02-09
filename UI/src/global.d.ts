import { CreateView } from './context/reducer';
import { ProjectProps, SchemaField, SchemaProps } from './types';

declare global {
  type DisplayProjectView = {
    mode: 'display';
    view: 'project';
    _id: string;
  };

  type EditProjectView = {
    view: 'project';
    _id: string;
  };

  type EditSchemaView = {
    view: 'schema';
    _id: string;
    projectID: string;
  };

  type EditFieldView = {
    view: 'field';
    _id: string;
    projectID: string;
    schemaID: string;
  };

  type SwitchEditView = {
    mode: 'edit';
  } & (EditProjectView | EditSchemaView | EditFieldView);

  type SwitchCreateView = {
    mode: 'create';
    view: CreateView;
  };

  type SetProjectAction = {
    type: 'SET_PROJECT';
    payload: string;
  };

  type CreateProjectAction = {
    type: 'CREATE_PROJECT';
    payload: ProjectProps;
  };

  type UpdateProjectAction = {
    type: 'UPDATE_PROJECT';
    payload: string;
  };

  type CreateSchemaAction = {
    type: 'CREATE_SCHEMA';
    payload: SchemaProps;
  };

  type UpdateSchemaAction = {
    type: 'UPDATE_SCHEMA';
    payload: string;
  };

  type CreateFieldAction = {
    type: 'CREATE_FIELD';
    payload: SchemaField;
  };

  type UpdateFieldAction = {
    type: 'UPDATE_FIELD';
    payload: SchemaField;
  };

  type SwitchViewAction = {
    type: 'SWITCH_VIEW';
    payload: DisplayProjectView | SwitchEditView | SwitchCreateView;
  };

  type ResetAction = {
    type: 'RESET_ACTION';
  };

  type ResotrePrevious = {
    type: 'RESTORE_PREV';
  };

  type SiteActions =
    | SetProjectAction
    | UpdateProjectAction
    | CreateProjectAction
    | CreateSchemaAction
    | UpdateSchemaAction
    | CreateFieldAction
    | UpdateFieldAction
    | SwitchViewAction
    | ResotrePrevious
    | ResetAction;
}
