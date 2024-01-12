import {faker} from '@faker-js/faker';
import {Stack, Typography} from '@mui/material';
import {MouseEvent as ReactMouseEvent} from 'react';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {AddFieldButton} from './AddFieldButton';
import {FieldList} from './FieldList';
import {PanelContainer} from './PanelContainer';
import {FieldTypes} from './workspaceSlice';
import {addField, Fields, setSelectedId} from './workspaceSlice';

export const LeftPanel = () => {
  const fields = useAppSelector(state => state.workspace.fields);
  const selectedId = useAppSelector(state => state.workspace.selectedId);
  const dispatch = useAppDispatch();

  const selectFieldById = (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
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
        <AddFieldButton addField={addFields} />
      </Stack>
      <FieldList
        fields={fields}
        handleListItemClick={selectFieldById}
        selectedId={selectedId}
      />
    </PanelContainer>
  );
};
