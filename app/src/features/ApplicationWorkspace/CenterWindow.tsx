import {Stack, styled, Typography} from '@mui/material';
import ContentEdidable from 'react-contenteditable';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {editField, Field} from './workspaceSlice';

export const CenterWindow = () => {
  const dispatch = useAppDispatch();
  const selectedField = useAppSelector(({workspace}) =>
    workspace.fields.find(field => field.id === workspace.selectedId)
  );

  const handleOnInput = (options: Partial<Field>) => {
    dispatch(
      editField({
        id: selectedField?.id,
        ...options,
      })
    );
  };

  return (
    <Stack sx={{flex: 1, py: 10, px: 2}}>
      <StyledWindow>
        {selectedField === undefined ? (
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              height: '100%',
            }}
          >
            <Typography variant="h5" sx={{color: 'text.secondary'}}>
              Select a field
            </Typography>
          </Stack>
        ) : (
          <Stack>
            <Typography variant="h5">
              <StyledContentEditable
                onChange={event =>
                  handleOnInput({title: event.currentTarget.textContent})
                }
                contentEditable
                data-placeholder="Write your question here"
                suppressContentEditableWarning
                html={selectedField.title}
              />
            </Typography>
            {/* <Typography variant="body1">
              <StyledContentEditable
                onChange={event =>
                  handleOnInput({
                    description: event.currentTarget.textContent,
                  })
                }
                contentEditable
                data-placeholder="Write a desecription (optional)"
                suppressContentEditableWarning
                html={selectedField.title}
              />
            </Typography> */}

            {/* <StyledEditableText
              onInput={handleOnInput}
              contentEditable
              variant="h5"
              data-placeholder="Write your question here"
              suppressContentEditableWarning
            >
              {selectedField.title}
            </StyledEditableText> */}
          </Stack>
        )}
      </StyledWindow>
    </Stack>
  );
};

const StyledWindow = styled(Stack)(({theme}) => ({
  height: '100%',
  width: '100%',
  aspectRatio: 'auto',
  backgroundColor: theme.palette.background.default,
  borderRadius: 2,
  boxShadow:
    'rgba(0, 0, 0, 0.08) 0px 2px 4px, rgba(0, 0, 0, 0.06) 0px 2px 12px;',
}));

const StyledContentEditable = styled(ContentEdidable)(({theme}) => ({
  '&[contenteditable="true"]:empty:before': {
    content: 'attr(data-placeholder)',
    display: 'block',
    color: theme.palette.text.secondary,
  },
}));
