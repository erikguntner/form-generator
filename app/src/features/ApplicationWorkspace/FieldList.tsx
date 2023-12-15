import {List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import {MouseEvent as ReactMouseEvent} from 'react';

import {Field, FieldTypeOptions} from './constants';

interface FieldListProps {
  fields: Field[];
  handleListItemClick: (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => void;
  selectedId: string | null;
}

export const FieldList = ({
  fields,
  selectedId,
  handleListItemClick,
}: FieldListProps) => {
  return (
    <List aria-label="list of fields">
      {fields.map(({id, type, title}) => (
        <ListItemButton
          key={id}
          selected={selectedId === id}
          onClick={event => handleListItemClick(event, id)}
        >
          <ListItemIcon sx={{color: 'text.primary'}}>
            {FieldTypeOptions[type].icon}
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      ))}
    </List>
  );
};
