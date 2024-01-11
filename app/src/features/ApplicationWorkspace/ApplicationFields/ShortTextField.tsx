import {TextField, TextFieldProps} from '@mui/material';

interface ShortTextFieldProps {}

export const ShortTextField = ({
  ...props
}: ShortTextFieldProps & TextFieldProps) => {
  return (
    <TextField
      multiline
      rows={2}
      id="outlined"
      variant="outlined"
      placeholder="Type you answer here"
      {...props}
    />
  );
};
