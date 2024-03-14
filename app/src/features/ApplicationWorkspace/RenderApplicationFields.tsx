import {
  DropdownField,
  EmailField,
  LongTextField,
  MultipleChoiceField,
  PhoneNumberField,
  ShortTextField,
  YesOrNoField,
} from './ApplicationFields';
import {Fields} from './workspaceSlice';

interface RenderFieldsProps {
  groupId: string;
  field: Fields;
}

export const RenderFields = ({groupId, field}: RenderFieldsProps) => {
  switch (field.type) {
    case 'short_text':
      return <ShortTextField disabled />;
    case 'long_text':
      return <LongTextField disabled />;
    case 'number':
      return <PhoneNumberField />;
    case 'email':
      return <EmailField disabled />;
    case 'yes_no':
      return <YesOrNoField />;
    case 'dropdown':
      return (
        <DropdownField
          groupId={groupId}
          id={field.id}
          choices={field.properties.choices || []}
        />
      );
    case 'multiple_choice':
      return <MultipleChoiceField groupId={groupId} id={field.id} />;
    default:
      throw new Error('Invalid field type');
  }
};
