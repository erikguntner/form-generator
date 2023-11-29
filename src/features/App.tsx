import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

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
            <Button variant="contained" onClick={createApplication}>
              Create Application
            </Button>
          </Stack>
          <Divider />
        </Stack>
        <Stack sx={{pt: 3}}>
          <Typography variant="h2" sx={{fontSize: 24}}>
            No Applications
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
