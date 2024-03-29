import {RootState} from '../../../redux/store';
import {
  render,
  screen,
  userEvent,
  within,
} from '../../../utils/test/test-utils';
import {fieldBuilder, fieldGroupBuilder} from '../constants';
import {LeftPanel} from '../LeftPanel';

const setup = (preloadedState: Partial<RootState> = {}) => {
  render(<LeftPanel />, {
    preloadedState: {
      workspace: {fieldGroups: [], selectedId: null},
      ...preloadedState,
    },
  });

  const addButton = screen.getByRole('button', {name: /add content/i});
  const fieldList = screen.getByRole('list', {name: /list of fields/i});

  return {
    addButton,
    fieldList,
  };
};

describe('LeftPanel', () => {
  test('Selecting a field from the menu adds a new field to the list', async () => {
    const {addButton} = setup();

    await userEvent.click(addButton);

    const fields = await screen.findAllByRole('listitem');

    expect(fields).toHaveLength(1);
    expect(fields[0]).toHaveTextContent(/.../i);
    expect(within(fields[0]).getByRole('button')).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  test('clicking on list item selects it', async () => {
    const fields = Array.from(Array(3), () => fieldBuilder());
    const fieldGroups = Array.from(Array(3), () => fieldGroupBuilder({fields}));
    setup({
      workspace: {
        fieldGroups,
        selectedId: fieldGroups[0].id,
      },
    });

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(fieldGroups.length);
    expect(within(listItems[0]).getByRole('button')).toHaveAttribute(
      'aria-selected',
      'true'
    );

    await userEvent.click(within(listItems[1]).getByRole('button'));
    expect(within(listItems[0]).getByRole('button')).toHaveAttribute(
      'aria-selected',
      'false'
    );
    expect(within(listItems[1]).getByRole('button')).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });
});
