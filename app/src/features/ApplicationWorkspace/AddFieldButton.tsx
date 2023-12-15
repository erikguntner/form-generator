import {Add} from '@mui/icons-material';
import {Button, Tooltip} from '@mui/material';

export const AddFieldButton = () => {
  return (
    <Tooltip title="Add content field" placement="top">
      <Button
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
  );
};
