import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type FieldTypes =
  | 'short_text'
  | 'long_text'
  | 'number'
  | 'email'
  | 'dropdown'
  | 'multiple_choice'
  | 'yes_no';

export interface Field {
  id: string;
  title: string;
  type: FieldTypes;
}

interface WorkspaceState {
  selectedId: string | null;
  fields: Field[];
}

const initialState: WorkspaceState = {
  selectedId: null,
  fields: [],
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    addField: (state, action: PayloadAction<Field>) => {
      state.fields.push(action.payload);
    },
    editField: (state, action: PayloadAction<Partial<Field>>) => {
      const {id, ...field} = action.payload;
      const index = state.fields.findIndex(field => field.id === id);
      const currField = state.fields[index];
      state.fields[index] = {...currField, ...field};
    },
  },
});

const {actions, reducer} = workspaceSlice;
export const {setSelectedId, addField, editField} = actions;
export default reducer;
