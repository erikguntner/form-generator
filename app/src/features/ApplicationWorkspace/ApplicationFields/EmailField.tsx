import {TextField, TextFieldProps} from '@mui/material';

interface EmailFieldProps {}

export const EmailField = ({...props}: EmailFieldProps & TextFieldProps) => {
  return (
    <TextField
      id="outlined"
      placeholder="example@emai.com"
      variant="outlined"
      {...props}
    />
  );
};
