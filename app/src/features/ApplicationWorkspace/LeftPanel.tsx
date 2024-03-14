import {faker} from '@faker-js/faker';
import {Add} from '@mui/icons-material';
import {Button, Stack, Typography} from '@mui/material';
import {MouseEvent as ReactMouseEvent} from 'react';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Tooltip} from '../Common';
import {AddFieldButton} from './AddFieldButton';
import {FieldGroupList} from './FieldGroupList';
import {PanelContainer} from './PanelContainer';
import {FieldTypes} from './workspaceSlice';
import {addField, addFieldGroup, Fields, setSelectedId} from './workspaceSlice';

export const LeftPanel = () => {
  const selectedId = useAppSelector(state => state.workspace.selectedId);
  const fieldGroups = useAppSelector(state => state.workspace.fieldGroups);
  const dispatch = useAppDispatch();

  console.log({fieldGroups});

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

  const addFields = (fieldType: FieldTypes) => {
    const newField: Fields = {
      id: faker.string.uuid(),
      type: fieldType,
      title: '',
      properties: {
        description: '',
      },
      validations: {},
    };

    if (fieldType === 'dropdown') {
      newField.properties.choices = [];
    }

    if (fieldType === 'multiple_choice') {
      newField.properties.choices = [
        {
          id: faker.string.uuid(),
          label: 'choice 1',
        },
        {
          id: faker.string.uuid(),
          label: 'choice 2',
        },
        {
          id: faker.string.uuid(),
          label: 'choice 3',
        },
      ];
    }

    dispatch(addField(newField));
    dispatch(setSelectedId(newField.id));
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
        <AddFieldButton addField={addFields} />
      </Stack>
      <FieldGroupList
        fieldGroups={fieldGroups}
        handleListItemClick={selectFieldById}
        selectedId={selectedId}
      />
    </PanelContainer>
  );
};
