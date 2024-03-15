import {Add} from '@mui/icons-material';
import {Button} from '@mui/material';
import {useState} from 'react';

import {Tooltip} from '../Common';
import {AddFieldMenu} from './AddFieldMenu';
import {FieldTypes} from './workspaceSlice';

interface AddFieldButtonProps {
  addField: (field: FieldTypes) => void;
}

export const AddFieldButton = ({addField}: AddFieldButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type?: FieldTypes) => {
    if (type) {
      addField(type);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Add content field" placement="top">
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            borderRadius: '8px',
            p: 1,
            minWidth: 'auto',
            color: 'palette.common.white',
          }}
          aria-label="Add Content"
          size="small"
        >
          <Add sx={{height: '18px'}} />
        </Button>
      </Tooltip>
      <AddFieldMenu
        isOpen={isOpen}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
    </>
  );
};
