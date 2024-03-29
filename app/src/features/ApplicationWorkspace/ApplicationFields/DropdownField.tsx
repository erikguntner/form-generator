import {faker} from '@faker-js/faker';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import {ChangeEvent, Fragment} from 'react';
import {useState} from 'react';

import {useAppDispatch} from '../../../redux/hooks';
import {Choice, editField} from '../workspaceSlice';

interface DropdownFieldProps {
  id: string;
  groupId: string;
  choices: Choice[];
}

export const DropdownField = ({id, groupId, choices}: DropdownFieldProps) => {
  const [choice, setChoice] = useState<string>('');
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setChoice(event.target.value as string);
  };

  const saveChoices = (value: string) => {
    const choices = value
      .split('\n')
      .filter(choice => choice !== '')
      .map(choice => {
        return {
          id: faker.string.uuid(),
          label: choice.trim(),
        };
      });

    dispatch(
      editField({
        groupId,
        id,
        field: {
          properties: {
            choices,
          },
        },
      })
    );

    handleClose();
  };

  return (
    <Fragment>
      <Stack gap={2} alignItems="start">
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={choice}
            displayEmpty
            inputProps={{'aria-label': 'select-choice'}}
            onChange={handleChange}
          >
            {choices.map(({label}) => {
              return (
                <MenuItem value={label}>
                  <em>{label}</em>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button onClick={handleClickOpen}>Edit Choices</Button>
      </Stack>
      <EditChoicesDialog
        key={id}
        open={open}
        handleClose={handleClose}
        saveChoices={saveChoices}
        choices={choices || []}
      />
    </Fragment>
  );
};

interface EditChoicesDialogProps {
  open: boolean;
  choices: Choice[];
  handleClose: () => void;
  saveChoices: (value: string) => void;
}

const EditChoicesDialog = ({
  open,
  choices,
  handleClose,
  saveChoices,
}: EditChoicesDialogProps) => {
  const [value, setValue] = useState<string>(() => {
    return choices.map(choice => choice.label).join('\n');
  });

  const handleSetValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCancel = () => {
    setValue(choices.map(choice => choice.label).join('\n'));
    handleClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <DialogTitle>Edit Choices</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Write or paste your choices below. Each choice must be on a separate
          line.
        </DialogContentText>
        <TextField
          sx={{mt: 2}}
          autoFocus
          id="name"
          name="edit_choices"
          fullWidth
          multiline
          rows={15}
          value={value}
          onChange={handleSetValue}
        />
      </DialogContent>
      <DialogActions sx={{px: 3, pt: 0, pb: 3}}>
        <Button color="inherit" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => saveChoices(value)}>
          Save Choices
        </Button>
      </DialogActions>
    </Dialog>
  );
};
