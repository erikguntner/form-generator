import {Container, Stack, styled, Typography} from '@mui/material';
import ContentEdidable from 'react-contenteditable';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
// import {RenderFields} from './RenderApplicationFields';
import {editFieldGroup, Fields} from './workspaceSlice';

export const CenterWindow = () => {
  const dispatch = useAppDispatch();
  const selectedFieldGroup = useAppSelector(({workspace}) =>
    workspace.fieldGroups.find(
      fieldGroup => fieldGroup.id === workspace.selectedId
    )
  );

  const handleOnChange = (options: Partial<Fields>) => {
    dispatch(
      editFieldGroup({
        id: selectedFieldGroup?.id,
        ...options,
      })
    );
  };

  return (
    <Stack sx={{flex: 1, py: 10, px: 2}}>
      <StyledWindow>
        {selectedFieldGroup === undefined ? (
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              height: '100%',
            }}
          >
            <Typography variant="h5" sx={{color: 'text.secondary'}}>
              Create a new field group
            </Typography>
          </Stack>
        ) : (
          <Container sx={{height: '100%'}} maxWidth="sm">
            <Stack
              sx={{height: '100%', paddingTop: 4}}
              justifyContent={'start'}
              gap={3}
            >
              <Stack>
                <Typography aria-labelledby="editable-title" variant="h5">
                  <StyledContentEditable
                    onChange={event =>
                      handleOnChange({title: event.currentTarget.textContent})
                    }
                    data-placeholder="Write your title here"
                    html={selectedFieldGroup.title}
                  />
                </Typography>
                {/* 
                  <StyledContentEditable
                    onChange={event =>
                      handleOnChange({title: event.currentTarget.textContent})
                    }
                    data-placeholder="Write your question here"
                    html={selectedFieldGroup.title}
                  />
                <StyledContentEditable
                  aria-labelledby="editable-description"
                  sx={{color: 'text.secondary'}}
                  onChange={event =>
                    handleOnChange({
                      properties: {
                        description: event.currentTarget.textContent,
                      },
                    })
                  }
                  data-placeholder="Write a desecription (optional)"
                  html={selectedField.properties.description || ''}
                /> */}
              </Stack>
              {/* <RenderFields field={selectedField} /> */}
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
