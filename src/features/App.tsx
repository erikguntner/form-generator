import {Add} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import {ApplicationList} from './ApplicationList';
import {applications} from './ApplicationList/constants';

function App() {
  const createApplication = () => {
    console.log('createApplication');
  };

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
        <ApplicationList applications={applications} />
      </Container>
    </Box>
  );
}

export default App;
