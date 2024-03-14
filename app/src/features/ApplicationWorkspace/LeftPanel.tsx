import {faker} from '@faker-js/faker';
import {Add} from '@mui/icons-material';
import {Button, Stack, Typography} from '@mui/material';
import {MouseEvent as ReactMouseEvent} from 'react';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Tooltip} from '../Common';
import {FieldGroupList} from './FieldGroupList';
import {PanelContainer} from './PanelContainer';
import {addFieldGroup, setSelectedId} from './workspaceSlice';

export const LeftPanel = () => {
  const selectedId = useAppSelector(state => state.workspace.selectedId);
  const fieldGroups = useAppSelector(state => state.workspace.fieldGroups);
  const dispatch = useAppDispatch();

  const selectFieldById = (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    dispatch(setSelectedId(id));
  };

  const handleAddFieldGroup = () => {
    const id = faker.string.uuid();
    dispatch(addFieldGroup({id}));
    dispatch(setSelectedId(id));
  };

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
        <Tooltip title="Add field group" placement="top">
          <Button
            onClick={handleAddFieldGroup}
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
      <FieldGroupList
        fieldGroups={fieldGroups}
        handleListItemClick={selectFieldById}
        selectedId={selectedId}
      />
    </PanelContainer>
  );
};
