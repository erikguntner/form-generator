import {Add} from '@mui/icons-material';
import {Button} from '@mui/material';
import {useState} from 'react';

import {Tooltip} from '../Common';
import {AddFieldMenu} from './AddFieldMenu';

export const AddFieldButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Add content field" placement="top">
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 1)',
            borderRadius: '8px',
            p: 1,
            minWidth: 'auto',
            color: 'palette.common.white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
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
