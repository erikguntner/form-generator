import {TextField, TextFieldProps} from '@mui/material';

interface LongTextFieldProps {
  props?: TextFieldProps;
}

export const LongTextField = ({
  ...props
}: LongTextFieldProps & TextFieldProps) => {
  return (
    <TextField
      multiline
      rows={4}
      id="outlined"
      placeholder="Type you answer here"
      variant="outlined"
      {...props}
    />
  );
};
