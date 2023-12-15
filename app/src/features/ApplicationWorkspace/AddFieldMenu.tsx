import {
  Check,
  Email,
  ExpandMore,
  LocalPhone,
  RadioButtonChecked,
  ShortText,
  Subject,
} from '@mui/icons-material';
import {Menu, MenuItem, MenuProps} from '@mui/material';
import {alpha, styled} from '@mui/material/styles';

import {FieldTypes} from './constants';

interface Field {
  label: FieldTypes;
  value: string;
}

const menuItems: Field[] = [
  {
    label: 'short_text',
    value: 'Short text',
  },
  {
    label: 'long_text',
    value: 'Long text',
  },
  {
    label: 'number',
    value: 'Phone Number',
  },

  {
    label: 'yes_no',
    value: 'Yes or No',
  },
  {
    label: 'multiple_choice',
    value: 'Multiple Choice',
  },

  {
    label: 'email',
    value: 'Email',
  },
  {
    label: 'dropdown',
    value: 'Dropdown',
  },
];

interface AddFieldMenuProps {
  isOpen: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
}

interface FieldTypeOption {
  icon: React.ReactNode;
  color: string;
}

export const AddFieldMenu = ({
  isOpen,
  handleClose,
  anchorEl,
}: AddFieldMenuProps) => {
  // object mapping field type to icon and color
  const FieldTypeOptions: Record<FieldTypes, FieldTypeOption> = {
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

  return (
    <StyledMenu
      open={isOpen}
      onClose={handleClose}
      anchorEl={anchorEl}
      id="add-field-menu"
      MenuListProps={{
        'aria-labelledby': 'add-field-menu',
      }}
    >
      {menuItems.map(({label, value}) => {
        return (
          <MenuItem key={label} onClick={handleClose} disableRipple>
            {FieldTypeOptions[label].icon}
            {value}
          </MenuItem>
        );
      })}
    </StyledMenu>
  );
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({theme}) => ({
  '& .MuiPaper-root': {
    borderRadius: 8,
    marginLeft: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 4px',
    },
    '& .MuiMenuItem-root': {
      borderRadius: 4,
      '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(1.5),
        fontSize: 18,
        color: theme.palette.text.primary,
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
