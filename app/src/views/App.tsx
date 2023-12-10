import {Add} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import {ApplicationList} from '../features/ApplicationList';
import {useGetApplicationsQuery} from '../services/generatedApi';

export const App = () => {
  const createApplication = () => {
    console.log('createApplication button clicked');
  };

  const {data, isLoading} = useGetApplicationsQuery();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'grey.50',
        py: 3,
      }}
    >
      <Container>
        <Stack spacing={3}>
          <Typography variant="h1" sx={{fontSize: 28}}>
            My Applications
          </Typography>
          <Stack direction="row">
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={createApplication}
            >
              Create Application
            </Button>
          </Stack>
          <Divider />
        </Stack>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ApplicationList applications={data || []} />
        )}
      </Container>
    </Box>
  );
};
