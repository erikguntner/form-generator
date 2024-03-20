import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {MouseEvent as ReactMouseEvent} from 'react';

import {FieldGroup} from './workspaceSlice';

interface FieldListProps {
  fieldGroups: FieldGroup[];
  handleListItemClick: (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => void;
  selectedId: string | null;
}

export const FieldGroupList = ({
  fieldGroups,
  selectedId,
  handleListItemClick,
}: FieldListProps) => {
  return (
    <List sx={{px: 1}} aria-label="list of fields">
      {fieldGroups.map(({id, title}, index) => {
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
                {index + 1}
              </ListItemIcon>
              <ListItemText sx={{textWrap: 'wrap'}} primary={fieldTitle} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
