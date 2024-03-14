import {faker} from '@faker-js/faker';
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
// type FieldProperties =
//   | BaseProperties
//   | DropdownFieldProperties
//   | MultipleChoiceFieldProperties;

// type FieldValidations =
//   | BaseValidations
//   | ShortTextFieldValidations
//   | LongTextFieldValidations;

export interface Choice {
  id: string;
  label: string;
}

export interface Fields {
  id: string;
  title: string;
  type: FieldTypes;
  properties: {
    description?: string;
    randomize?: boolean;
    alphabetical_order?: boolean;
    allow_multiple_selection?: boolean;
    allow_other_choice?: boolean;
    choices?: Choice[];
  };
  validations: {
    required?: boolean;
    max_characters?: number;
  };
}

// interface BaseField<
//   T extends FieldTypes,
//   P extends FieldProperties,
//   V extends FieldValidations,
// > {
//   id: string;
//   title: string;
//   type: T;
//   properties: P;
//   validations: V;
// }

// interface BaseProperties {
//   description?: string;
// }

// interface BaseValidations {
//   required?: boolean;
// }

// //Space Types for properties
// interface DropdownFieldProperties extends BaseProperties {
//   randomize?: boolean;
//   alphabetical_order?: boolean;
//   choices?: {
//     id: string;
//     label: string;
//   }[];
// }

// interface MultipleChoiceFieldProperties extends BaseProperties {
//   randomize?: boolean;
//   allow_multiple_selection?: boolean;
//   allow_other_choice?: boolean;
//   choices?: {
//     id: string;
//     label: string;
//   }[];
// }

// // Specific Types for validations
// interface ShortTextFieldValidations extends BaseValidations {
//   max_characters?: number;
// }
// interface LongTextFieldValidations extends BaseValidations {
//   max_characters?: number;
// }

// // Specific Types for fields
// type ShortTextField = BaseField<
//   'short_text',
//   BaseProperties,
//   ShortTextFieldValidations
// >;

// type LongTextField = BaseField<
//   'long_text',
//   BaseProperties,
//   LongTextFieldValidations
// >;

// type EmailField = BaseField<'email', BaseProperties, BaseValidations>;

// type PhoneNumberField = BaseField<'number', BaseProperties, BaseValidations>;

// type YesNoField = BaseField<'yes_no', BaseProperties, BaseValidations>;

// type DropdownField = BaseField<
//   'dropdown',
//   DropdownFieldProperties,
//   BaseValidations
// >;

// type MultipleChoiceField = BaseField<
//   'multiple_choice',
//   MultipleChoiceFieldProperties,
//   BaseValidations
// >;
// export type Fields =
//   | ShortTextField
//   | LongTextField
//   | EmailField
//   | PhoneNumberField
//   | YesNoField
//   | DropdownField
//   | MultipleChoiceField;

export interface FieldGroup {
  id: string;
  title: string;
  fields: Fields[];
}

interface WorkspaceState {
  selectedId: string | null;
  fieldGroups: FieldGroup[];
  fields: Fields[];
}

// type Expand<T> = T extends infer O ? {[K in keyof O]: O[K]} : never;

const initialState: WorkspaceState = {
  selectedId: null,
  fieldGroups: [],
  fields: [],
};

const getGroupAndFieldIndex = (
  groupId: string,
  fieldId: string,
  fieldGroups: FieldGroup[]
) => {
  const groupIndex = fieldGroups.findIndex(group => group.id === groupId);
  const fieldIndex = fieldGroups[groupIndex].fields.findIndex(
    field => field.id === fieldId
  );
  return {groupIndex, fieldIndex};
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    addFieldGroup: (state, action: PayloadAction<{id: string}>) => {
      state.fieldGroups.push({
        id: action.payload.id,
        title: '',
        fields: [],
      });
    },
    editFieldGroup: (state, action) => {
      const {id, title} = action.payload;
      const index = state.fieldGroups.findIndex(field => field.id === id);
      state.fieldGroups[index].title = title;
    },
    addField: (state, action: PayloadAction<{id: string; field: Fields}>) => {
      const {id, field} = action.payload;
      const index = state.fieldGroups.findIndex(field => field.id === id);
      state.fieldGroups[index].fields.push(field);
    },
    addChoice: (
      state,
      action: PayloadAction<{groupId: string; id: string}>
    ) => {
      const {groupId, id} = action.payload;
      const groupIndex = state.fieldGroups.findIndex(
        group => group.id === groupId
      );

      const fieldIndex = state.fieldGroups[groupIndex].fields.findIndex(
        field => field.id === id
      );
      const choice = {
        id: faker.string.uuid(),
        label: '',
      };
      state.fieldGroups[groupIndex].fields[fieldIndex].properties.choices?.push(
        choice
      );
    },
    updateChoice: (
      state,
      action: PayloadAction<{
        groupId: string;
        fieldId: string;
        choiceId: string;
        label: string;
      }>
    ) => {
      const {groupId, fieldId, choiceId, label} = action.payload;
      const {groupIndex, fieldIndex} = getGroupAndFieldIndex(
        groupId,
        fieldId,
        state.fieldGroups
      );
      const choiceIndex = state.fieldGroups[groupIndex].fields[
        fieldIndex
      ].properties.choices?.findIndex(choice => choice.id === choiceId);
      
      state.fieldGroups[groupIndex].fields[fieldIndex].properties.choices![
        choiceIndex!
      ].label = label;
    },
    deleteChoice: (
      state,
      action: PayloadAction<{
        groupId: string;
        fieldId: string;
        choiceId: string;
      }>
    ) => {
      const {groupId, fieldId, choiceId} = action.payload;
      const {groupIndex, fieldIndex} = getGroupAndFieldIndex(
        groupId,
        fieldId,
        state.fieldGroups
      );
      const choiceIndex = state.fieldGroups[groupIndex].fields[
        fieldIndex
      ].properties.choices?.findIndex(choice => choice.id === choiceId);

      state.fieldGroups[groupIndex].fields[
        fieldIndex
      ].properties.choices?.splice(choiceIndex!, 1);
    },
    editField: (
      state,
      action: PayloadAction<{
        groupId: string;
        id: string;
        field: Partial<Fields>;
      }>
    ) => {
      const {groupId, id, field} = action.payload;
      const groupIndex = state.fieldGroups.findIndex(
        group => group.id === groupId
      );

      const fieldIndex = state.fieldGroups[groupIndex].fields.findIndex(
        field => field.id === id
      );
      const currField = state.fieldGroups[groupIndex].fields[fieldIndex];
      state.fieldGroups[groupIndex].fields.splice(fieldIndex, 1, {
        ...currField,
        ...field,
        properties: {
          ...currField.properties,
          ...field.properties,
        },
        validations: {
          ...currField.validations,
          ...field.validations,
        },
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
export const {
  setSelectedId,
  addFieldGroup,
  editFieldGroup,
  addField,
  editField,
  addChoice,
  updateChoice,
  deleteChoice,
} = actions;
export default reducer;
