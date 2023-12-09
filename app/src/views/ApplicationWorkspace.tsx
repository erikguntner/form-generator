import {Box, Container, Stack, Typography} from '@mui/material';

export const ApplicationWorkspace = () => {
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
        </Stack>
      </Container>
    </Box>
  );
};
