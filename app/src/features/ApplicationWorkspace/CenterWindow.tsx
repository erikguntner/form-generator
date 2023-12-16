import {Stack} from '@mui/material';
export const CenterWindow = () => {
  return (
    <Stack sx={{flex: 1, py: 10, px: 2}}>
      <Stack
        sx={{
          height: '100%',
          width: '100%',
          aspectRatio: 'auto',
          backgroundColor: 'background.default',
          borderRadius: 2,
          boxShadow:
            'rgba(0, 0, 0, 0.08) 0px 2px 4px, rgba(0, 0, 0, 0.06) 0px 2px 12px;',
        }}
      ></Stack>
    </Stack>
  );
};
