import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Button, IconButton, Stack, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

import {GetApplicationsApiResponse} from '../../services/generatedApi';
import {formatDate} from './constants';

interface ApplicationListProps {
  applications: GetApplicationsApiResponse;
}

export const ApplicationList = ({applications}: ApplicationListProps) => {
  return (
    <Stack sx={{pt: 3}} spacing={2}>
      {applications.map(({id, name, created_at, updated_at}) => {
        const dateCreated = formatDate(created_at);
        const dateUpdated = formatDate(updated_at);

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
            <Stack spacing={2} direction="row" alignItems="center">
              <Stack>
                <Typography sx={{fontSize: '14px'}}>{name}</Typography>
                <Typography fontSize="small" sx={{color: 'text.secondary'}}>
                  Created: {dateCreated}
                </Typography>
              </Stack>
              <Button
                variant="contained"
                color="inherit"
                component={Link}
                size="small"
                to={`/application/${id}`}
              >
                Edit
              </Button>
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
