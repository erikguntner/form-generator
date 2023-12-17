import {TextField, TextFieldProps} from '@mui/material';

interface PhoneNumberFieldProps {}

export const PhoneNumberField = ({
  ...props
}: PhoneNumberFieldProps & TextFieldProps) => {
  return (
    <TextField
      id="outlined"
      placeholder="(909)555-1234"
      variant="outlined"
      {...props}
    />
  );
};
