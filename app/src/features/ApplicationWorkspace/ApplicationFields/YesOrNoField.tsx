import {FormControl, FormControlLabel, Radio, RadioGroup} from '@mui/material';

export const YesOrNoField = () => {
  return (
    <FormControl>
      <RadioGroup row aria-labelledby="yes-no-field" name="yes-no-field">
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  );
};
