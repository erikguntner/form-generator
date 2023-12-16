import {faker} from '@faker-js/faker';
import {Stack, Typography} from '@mui/material';
import {MouseEvent as ReactMouseEvent} from 'react';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {AddFieldButton} from './AddFieldButton';
import {FieldTypes} from './constants';
import {FieldList} from './FieldList';
import {PanelContainer} from './PanelContainer';
import {addField, Field, setSelectedId} from './workspaceSlice';

export const LeftPanel = () => {
  const fields = useAppSelector(state => state.workspace.fields);
  const selectedId = useAppSelector(state => state.workspace.selectedId);
  const dispatch = useAppDispatch();

  const handleListItemClick = (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    dispatch(setSelectedId(id));
  };

  const addFields = (fieldType: FieldTypes) => {
    const newField: Field = {
      id: faker.string.uuid(),
      type: fieldType,
      title: '...',
    };

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
        handleListItemClick={handleListItemClick}
        selectedId={selectedId}
      />
    </PanelContainer>
  );
};
