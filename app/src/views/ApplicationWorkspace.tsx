import {CircularProgress, Stack, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';

import {useGetApplicationByApplicationIdQuery} from '../services/generatedApi';

export const ApplicationWorkspace = () => {
  const {applicationId} = useParams();

  const {data, isLoading, isFetching} = useGetApplicationByApplicationIdQuery(
    {
      applicationId: applicationId || '',
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <Stack
      direction="row"
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'grey.50',
      }}
    >
      {isLoading || isFetching ? (
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: '100%',
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <Stack
            sx={{
              p: 2,
              width: '256px',
              borderRight: '1px solid',
              borderColor: 'grey.200',
              backgroundColor: 'background.default',
            }}
          >
            <Typography variant="subtitle1">Content</Typography>
          </Stack>
          <Stack sx={{flex: 1, py: 8, px: 4}}>
            <Stack
              sx={{
                height: '100%',
                width: '100%',
                backgroundColor: 'background.default',
                borderRadius: 2,
                boxShadow:
                  'rgba(0, 0, 0, 0.08) 0px 2px 4px, rgba(0, 0, 0, 0.06) 0px 2px 12px;',
              }}
            ></Stack>
          </Stack>
          <Stack
            sx={{
              p: 2,
              width: '256px',
              borderLeft: '1px solid',
              borderColor: 'grey.200',
              backgroundColor: 'background.default',
            }}
          >
            <Typography variant="subtitle1">Right sidebar</Typography>
          </Stack>
        </>
      )}
    </Stack>
  );
};
