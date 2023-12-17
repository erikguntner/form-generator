import {Container, Stack, styled, Typography} from '@mui/material';
import ContentEdidable from 'react-contenteditable';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {RenderFields} from './RenderApplicationFields';
import {editField, Field} from './workspaceSlice';

export const CenterWindow = () => {
  const dispatch = useAppDispatch();
  const selectedField = useAppSelector(({workspace}) =>
    workspace.fields.find(field => field.id === workspace.selectedId)
  );

  const handleOnChange = (options: Partial<Field>) => {
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
          <Container sx={{height: '100%'}} maxWidth="sm">
            <Stack sx={{height: '100%'}} justifyContent={'center'} gap={3}>
              <Stack>
                <Typography variant="h5">
                  <StyledContentEditable
                    onChange={event =>
                      handleOnChange({title: event.currentTarget.textContent})
                    }
                    data-placeholder="Write your question here"
                    html={selectedField.title}
                  />
                </Typography>
                <StyledContentEditable
                  sx={{color: 'text.secondary'}}
                  onChange={event =>
                    handleOnChange({
                      description: event.currentTarget.textContent,
                    })
                  }
                  data-placeholder="Write a desecription (optional)"
                  html={`${selectedField.description}`}
                />
              </Stack>
              <RenderFields field={selectedField} />
            </Stack>
          </Container>
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
  borderRadius: 4,
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
