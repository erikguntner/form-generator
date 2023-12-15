import {Add} from '@mui/icons-material';
import {Button, Stack, Typography} from '@mui/material';

import {Tooltip} from '../Common';
import {PanelContainer} from './PanelContainer';

export const LeftPanel = () => {
  return (
    <PanelContainer side="left">
      <Stack
        sx={{p: 2}}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1" fontWeight="500">
          Content
        </Typography>
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
      </Stack>
    </PanelContainer>
  );
};
