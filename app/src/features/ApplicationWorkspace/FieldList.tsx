import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {MouseEvent as ReactMouseEvent} from 'react';

import {Field} from './constants';
import {FieldIcons} from './FieldIcons';

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
    <List sx={{px: 1}} aria-label="list of fields">
      {fields.map(({id, type, title}) => (
        <ListItem key={id} disableGutters disablePadding>
          <ListItemButton
            sx={{borderRadius: '8px'}}
            aria-selected={selectedId === id}
            selected={selectedId === id}
            onClick={event => handleListItemClick(event, id)}
            disableRipple
          >
            <ListItemIcon sx={{color: 'text.primary'}}>
              {FieldIcons[type].icon}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
