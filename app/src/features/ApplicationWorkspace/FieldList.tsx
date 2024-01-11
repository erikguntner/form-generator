import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {MouseEvent as ReactMouseEvent} from 'react';

import {FieldIcons} from './FieldIcons';
import {Fields} from './workspaceSlice';

interface FieldListProps {
  fields: Fields[];
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
      {fields.map(({id, type, title}) => {
        const fieldTitle = title || '...';
        return (
          <ListItem key={id} disableGutters disablePadding>
            <ListItemButton
              sx={{borderRadius: '8px', gap: 2}}
              aria-selected={selectedId === id}
              selected={selectedId === id}
              onClick={event => handleListItemClick(event, id)}
              disableRipple
            >
              <ListItemIcon sx={{color: 'text.primary', minWidth: 'auto'}}>
                {FieldIcons[type].icon}
              </ListItemIcon>
              <ListItemText sx={{textWrap: 'wrap'}} primary={fieldTitle} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
