import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
} from '@mui/material';
import {styled} from '@mui/material/styles';

import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {addChoice, deleteChoice, updateChoice} from '../workspaceSlice';

interface MultipleChoiceFieldProps {}

export const MultipleChoiceField = ({}: MultipleChoiceFieldProps) => {
  const dispatch = useAppDispatch();
  const selectedField = useAppSelector(({workspace}) =>
    workspace.fields.find(field => field.id === workspace.selectedId)
  );

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
    choiceId: string
  ) => {
    dispatch(
      updateChoice({
        id,
        choiceId,
        label: event.currentTarget.value,
      })
    );
  };

  const addNewChoice = () => {
    if (selectedField) {
      dispatch(addChoice({id: selectedField.id}));
    }
  };

  const handleDeleteChoice = (id: string, choiceId: string) => {
    dispatch(deleteChoice({id, choiceId}));
  };

  return (
    <Stack gap={2} alignItems="start">
      <List disablePadding>
        {selectedField?.properties.choices?.map(({id, label}, index) => {
          return (
            <ListItem disableGutters key={id}>
              <StyledListNumber>{index + 1}</StyledListNumber>
              <StyledTextField
                fullWidth
                id="outlined"
                variant="outlined"
                placeholder="Type choice"
                value={label}
                multiline
                onChange={event => handleOnChange(event, selectedField.id, id)}
              />
              <StyledIconButton
                onClick={() => handleDeleteChoice(selectedField.id, id)}
                size="small"
                aria-label="delete"
              >
                <ClearIcon fontSize="inherit" />
              </StyledIconButton>
            </ListItem>
          );
        })}
      </List>
      <Button variant="outlined" onClick={addNewChoice}>
        Add Choice
      </Button>
    </Stack>
  );
};

const StyledIconButton = styled(IconButton)(({theme}) => ({
  backgroundColor: theme.palette.grey[700],
  color: 'white',
  fontSize: 14,
  '&:hover': {
    backgroundColor: theme.palette.grey[600],
  },
  position: 'absolute',
  right: 0,
  transform: 'translateX(50%)',
}));

const StyledTextField = styled(TextField)(({theme}) => ({
  '& .MuiOutlinedInput-root': {
    paddingLeft: theme.spacing(6),
  },
}));

const StyledListNumber = styled(Box)(({theme}) => ({
  position: 'absolute',
  left: `${theme.spacing(1.5)}`,
  top: `${theme.spacing(2.5)}`,
  border: '1px solid',
  borderColor: theme.palette.grey[300],
  padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
  marginRight: theme.spacing(1),
  lineHeight: 1,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[100],
}));
