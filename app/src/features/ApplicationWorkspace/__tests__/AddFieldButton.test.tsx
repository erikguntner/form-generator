import {render, screen, userEvent} from '../../../utils/test/test-utils';
import {AddFieldButton} from '../AddFieldButton';

describe('AddFieldButton', () => {
  test('renders button with icon and tooltip', () => {
    render(<AddFieldButton addField={vi.fn()} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
  });

  test('toggles menu when button is clicked', async () => {
    render(<AddFieldButton addField={vi.fn()} />);

    const addFieldButton = screen.getByRole('button', {name: /add content/i});
    await userEvent.click(addFieldButton);
    await screen.findByRole('menu');
    await userEvent.click(
      screen.getByRole('presentation').firstChild as HTMLElement
    );
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  test('calls addField with the correct type when menu item is clicked', async () => {
    const addField = vi.fn();
    render(<AddFieldButton addField={addField} />);

    const addFieldButton = screen.getByRole('button', {name: /add content/i});
    await userEvent.click(addFieldButton);
    await screen.findByRole('menu');
    const menuItem = screen.getByRole('menuitem', {name: /short text/i});
    await userEvent.click(menuItem);
    expect(addField).toHaveBeenCalledWith('short_text');
  });

  test('closes menu when menu item is clicked', async () => {
    render(<AddFieldButton addField={vi.fn()} />);

    const addFieldButton = screen.getByRole('button', {name: /add content/i});
    await userEvent.click(addFieldButton);
    const menuItem = await screen.findByRole('menuitem', {name: /short text/i});
    await userEvent.click(menuItem);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
