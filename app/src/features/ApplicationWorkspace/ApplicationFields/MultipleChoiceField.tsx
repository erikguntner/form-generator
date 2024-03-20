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

import {useAppDispatch} from '../../../redux/hooks';
import {addChoice, Choice, deleteChoice, updateChoice} from '../workspaceSlice';

interface MultipleChoiceFieldProps {
  id: string;
  groupId: string;
  choices: Choice[];
}

export const MultipleChoiceField = ({
  id,
  groupId,
  choices,
}: MultipleChoiceFieldProps) => {
  const dispatch = useAppDispatch();

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
    choiceId: string
  ) => {
    dispatch(
      updateChoice({
        groupId,
        fieldId: id,
        choiceId,
        label: event.currentTarget.value,
      })
    );
  };

  const addNewChoice = () => {
    dispatch(addChoice({groupId, id}));
  };

  const handleDeleteChoice = (id: string, choiceId: string) => {
    dispatch(deleteChoice({groupId, fieldId: id, choiceId}));
  };

  return (
    <Stack gap={1} alignItems="start">
      <List disablePadding>
        {choices.map((choice, index) => {
          return (
            <ListItem disableGutters key={choice.id}>
              <StyledListNumber>{index + 1}</StyledListNumber>
              <StyledTextField
                fullWidth
                id="outlined"
                variant="outlined"
                placeholder="Type choice"
                value={choice.label}
                multiline
                autoFocus
                onChange={event => handleOnChange(event, id, choice.id)}
              />
              {choices.length && choices.length > 1 ? (
                <StyledIconButton
                  onClick={() => handleDeleteChoice(id, choice.id)}
                  size="small"
                  aria-label="delete"
                >
                  <ClearIcon fontSize="inherit" />
                </StyledIconButton>
              ) : null}
            </ListItem>
          );
        })}
      </List>
      <Button onClick={addNewChoice}>Add Choice</Button>
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
  fontSize: 12,
}));
