import {faker} from '@faker-js/faker';
import {Stack, Typography} from '@mui/material';
import {MouseEvent as ReactMouseEvent, useState} from 'react';

import {AddFieldButton} from './AddFieldButton';
import {Field, FieldTypes} from './constants';
import {FieldList} from './FieldList';
import {PanelContainer} from './PanelContainer';

export const LeftPanel = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedId, setSelectedId] = useState<null | string>(null);

  const handleListItemClick = (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    setSelectedId(id);
  };

  const addField = (fieldType: FieldTypes) => {
    const newField = {
      id: faker.string.uuid(),
      type: fieldType,
      title: '...',
    };

    setFields(prevFields => [...prevFields, newField]);

    setSelectedId(newField.id);
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
        <AddFieldButton addField={addField} />
      </Stack>
      <FieldList
        fields={fields}
        handleListItemClick={handleListItemClick}
        selectedId={selectedId}
      />
    </PanelContainer>
  );
};
