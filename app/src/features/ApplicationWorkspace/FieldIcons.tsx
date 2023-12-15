import {
  Check,
  Email,
  ExpandMore,
  LocalPhone,
  RadioButtonChecked,
  ShortText,
  Subject,
} from '@mui/icons-material';

import {FieldTypes} from './constants';

interface FieldTypeOption {
  icon: React.ReactNode;
  color: string;
}

export const FieldIcons: Record<FieldTypes, FieldTypeOption> = {
  short_text: {
    icon: <ShortText />,
    color: 'primary.main',
  },
  long_text: {
    icon: <Subject />,
    color: 'secondary.main',
  },
  number: {
    icon: <LocalPhone />,
    color: 'warning.main',
  },
  yes_no: {
    icon: <RadioButtonChecked />,
    color: 'success.main',
  },
  multiple_choice: {
    icon: <Check />,
    color: 'success.main',
  },
  email: {
    icon: <Email />,
    color: 'error.main',
  },
  dropdown: {
    icon: <ExpandMore />,
    color: 'info.main',
  },
};
