import {CircularProgress, Stack, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';

import {CenterWindow} from '../features/ApplicationWorkspace/CenterWindow';
import {LeftPanel} from '../features/ApplicationWorkspace/LeftPanel';
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
          <LeftPanel />
          <CenterWindow />
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
