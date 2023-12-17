import {
  EmailField,
  LongTextField,
  PhoneNumberField,
  ShortTextField,
} from './ApplicationFields';
import {Field} from './workspaceSlice';

interface RenderFieldsProps {
  field: Field;
}

export const RenderFields = ({field}: RenderFieldsProps) => {
  switch (field.type) {
    case 'short_text':
      return <ShortTextField disabled />;
    case 'long_text':
      return <LongTextField disabled />;
    case 'number':
      return <PhoneNumberField disabled />;
    case 'email':
      return <EmailField disabled />;
    default:
      throw new Error('Invalid field type');
  }
};
