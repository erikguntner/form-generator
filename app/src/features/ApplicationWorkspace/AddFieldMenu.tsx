import {Menu, MenuItem, MenuProps} from '@mui/material';
import {alpha, styled} from '@mui/material/styles';

interface AddFieldMenuProps {
  isOpen: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
}

export const AddFieldMenu = ({
  isOpen,
  handleClose,
  anchorEl,
}: AddFieldMenuProps) => {
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
      <MenuItem onClick={handleClose} disableRipple>
        Short Text
      </MenuItem>
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
    borderRadius: 6,
    marginLeft: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
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
