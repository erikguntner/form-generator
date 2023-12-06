import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {IconButton, Stack, Typography} from '@mui/material';

import {Application, formatDate} from './constants';

interface ApplicationListProps {
  applications: Application[];
}

export const ApplicationList = ({applications}: ApplicationListProps) => {
  return (
    <Stack sx={{pt: 3}} spacing={2}>
      {applications.map(({id, title, createdAt, updatedAt}) => {
        const dateCreated = formatDate(createdAt);
        const dateUpdated = formatDate(updatedAt);

        return (
          <Stack
            key={id}
            direction="row"
            data-testid="application-item"
            sx={{
              border: 'none',
              padding: 2,
              backgroundColor: 'background.default',
              borderRadius: 1,
              boxShadow:
                'rgba(0, 0, 0, 0.08) 0px 2px 4px, rgba(0, 0, 0, 0.06) 0px 2px 12px;',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Stack>
              <Typography sx={{fontSize: '14px'}}>{title}</Typography>
              <Typography fontSize="small" sx={{color: 'text.secondary'}}>
                Created: {dateCreated}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
              <Typography>{dateUpdated}</Typography>
              <IconButton
                sx={{borderRadius: '8px'}}
                color="inherit"
                aria-label="options"
              >
                <MoreHorizIcon />
              </IconButton>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};