import {Stack, Typography} from '@mui/material';

import {AddFieldButton} from './AddFieldButton';
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
        <AddFieldButton />
      </Stack>
    </PanelContainer>
  );
};
