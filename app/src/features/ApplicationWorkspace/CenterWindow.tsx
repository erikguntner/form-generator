import {faker} from '@faker-js/faker';
import {Container, Stack, styled, Typography} from '@mui/material';
import ContentEdidable from 'react-contenteditable';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {AddFieldButton} from './AddFieldButton';
import {RenderFields} from './RenderApplicationFields';
import {
  addField,
  editField,
  editFieldGroup,
  Fields,
  FieldTypes,
} from './workspaceSlice';

export const CenterWindow = () => {
  const dispatch = useAppDispatch();
  const fieldGroup = useAppSelector(({workspace}) =>
    workspace.fieldGroups.find(
      fieldGroup => fieldGroup.id === workspace.selectedId
    )
  );

  if (fieldGroup === undefined) {
    return (
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
    );
  }

  const handleOnChange = (options: Partial<Fields>) => {
    dispatch(
      editFieldGroup({
        id: fieldGroup.id,
        ...options,
      })
    );
  };

  const handleEditField = ({id, title}: {id: string; title: string}) => {
    dispatch(editField({groupId: fieldGroup.id, id, field: {title}}));
  };

  const addFields = (fieldType: FieldTypes) => {
    const field: Fields = {
      id: faker.string.uuid(),
      type: fieldType,
      title: '',
      properties: {
        description: '',
      },
      validations: {},
    };

    if (fieldType === 'dropdown') {
      field.properties.choices = [];
    }

    if (fieldType === 'multiple_choice') {
      field.properties.choices = [
        {
          id: faker.string.uuid(),
          label: 'choice 1',
        },
        {
          id: faker.string.uuid(),
          label: 'choice 2',
        },
        {
          id: faker.string.uuid(),
          label: 'choice 3',
        },
      ];
    }

    dispatch(addField({id: fieldGroup.id, field}));
  };

  return (
    <Stack sx={{flex: 1, py: 10, px: 2}}>
      <StyledWindow>
        <Container sx={{height: '100%'}} maxWidth="sm">
          <Stack
            sx={{height: '100%', paddingTop: 4, overflowY: 'auto'}}
            justifyContent={'start'}
            gap={3}
          >
            <Stack sx={{gap: 3}}>
              <Typography aria-labelledby="editable-title" variant="h5">
                <StyledContentEditable
                  onChange={event =>
                    handleOnChange({title: event.currentTarget.textContent})
                  }
                  data-placeholder="Write your title here"
                  html={fieldGroup.title}
                />
              </Typography>
              {fieldGroup.fields.map(field => {
                return (
                  <Stack key={field.id} sx={{gap: 2}}>
                    <StyledContentEditable
                      onChange={event =>
                        handleEditField({
                          id: field.id,
                          title: event.currentTarget.textContent,
                        })
                      }
                      data-placeholder="Write your question here"
                      html={field.title}
                    />
                    <RenderFields groupId={fieldGroup.id} field={field} />
                  </Stack>
                );
              })}
              <AddFieldButton addField={addFields} />
            </Stack>
          </Stack>
        </Container>
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
