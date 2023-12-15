import {Stack} from '@mui/material';

interface PanelContainerProps {
  side: 'left' | 'right';
  children: React.ReactNode;
}

export const PanelContainer = ({side, children}: PanelContainerProps) => {
  const borderProp = {
    left: 'borderRight',
    right: 'borderLeft',
  };

  return (
    <Stack
      sx={{
        width: '256px',
        [borderProp[side]]: '1px solid',
        borderColor: 'grey.200',
        backgroundColor: 'background.default',
      }}
    >
      {children}
    </Stack>
  );
};
