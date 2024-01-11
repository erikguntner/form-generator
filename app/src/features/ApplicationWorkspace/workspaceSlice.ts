import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Types of Fields
export const fieldTypes = [
  'short_text',
  'long_text',
  'number',
  'email',
  'dropdown',
  'multiple_choice',
  'yes_no',
] as const;

type FieldTypeTuple = typeof fieldTypes;

export type FieldTypes = FieldTypeTuple[number];

// Base Types for fields, properties, and validations
type FieldProperties =
  | BaseProperties
  | DropdownFieldProperties
  | MultipleChoiceFieldProperties;

type FieldValidations =
  | BaseValidations
  | ShortTextFieldValidations
  | LongTextFieldValidations;

// interface FieldBase {
//   id: string;
//   title: string;
//   type: FieldTypes;
//   properties: {
//     description?: string;
//     randomize?: boolean;
//     alphabetical_order?: boolean;
//     allow_multiple_selection?: boolean;
//     allow_other_choice?: boolean;
//     choices?: {
//       id: string;
//       label: string;
//     }[];
//   };
//   validations: {
//     required?: boolean;
//     max_characters?: number;
//   };
// }

interface BaseField<
  T extends FieldTypes,
  P extends FieldProperties,
  V extends FieldValidations,
> {
  id: string;
  title: string;
  type: T;
  properties: P;
  validations: V;
}

interface BaseProperties {
  description?: string;
}

interface BaseValidations {
  required?: boolean;
}

//Space Types for properties
interface DropdownFieldProperties extends BaseProperties {
  randomize?: boolean;
  alphabetical_order?: boolean;
  choices?: {
    id: string;
    label: string;
  }[];
}

interface MultipleChoiceFieldProperties extends BaseProperties {
  randomize?: boolean;
  allow_multiple_selection?: boolean;
  allow_other_choice?: boolean;
  choices?: {
    id: string;
    label: string;
  }[];
}

// Specific Types for validations
interface ShortTextFieldValidations extends BaseValidations {
  max_characters?: number;
}
interface LongTextFieldValidations extends BaseValidations {
  max_characters?: number;
}

// Specific Types for fields
type ShortTextField = BaseField<
  'short_text',
  BaseProperties,
  ShortTextFieldValidations
>;

type LongTextField = BaseField<
  'long_text',
  BaseProperties,
  LongTextFieldValidations
>;

type EmailField = BaseField<'email', BaseProperties, BaseValidations>;

type PhoneNumberField = BaseField<'number', BaseProperties, BaseValidations>;

type YesNoField = BaseField<'yes_no', BaseProperties, BaseValidations>;

type DropdownField = BaseField<
  'dropdown',
  DropdownFieldProperties,
  BaseValidations
>;

type MultipleChoiceField = BaseField<
  'multiple_choice',
  MultipleChoiceFieldProperties,
  BaseValidations
>;
export type Fields =
  | ShortTextField
  | LongTextField
  | EmailField
  | PhoneNumberField
  | YesNoField
  | DropdownField
  | MultipleChoiceField;

interface WorkspaceState {
  selectedId: string | null;
  fields: Fields[];
}

// type Expand<T> = T extends infer O ? {[K in keyof O]: O[K]} : never;

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
    addField: (state, action: PayloadAction<Fields>) => {
      state.fields.push(action.payload);
    },
    editField: (state, action: PayloadAction<Partial<Fields>>) => {
      const {id} = action.payload;
      const index = state.fields.findIndex(field => field.id === id);
      const currField = state.fields[index];
      state.fields.splice(index, 1, {
        ...currField,
        ...action.payload,
        properties: {...currField.properties, ...action.payload.properties},
        validations: {...currField.validations, ...action.payload.validations},
      });
    },
    editTitle: (state, action: PayloadAction<{id: string; title: string}>) => {
      const {id, title} = action.payload;
      const index = state.fields.findIndex(field => field.id === id);
      state.fields[index].title = title;
    },
    editDescription: (
      state,
      action: PayloadAction<{id: string; description: string}>
    ) => {
      const {id, description} = action.payload;
      const index = state.fields.findIndex(field => field.id === id);
      state.fields[index].properties.description = description;
    },
  },
});

const {actions, reducer} = workspaceSlice;
export const {setSelectedId, addField, editField} = actions;
export default reducer;
