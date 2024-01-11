import {render, screen} from '../../../utils/test/test-utils';
import {fieldBuilder} from '../constants';
import {RenderFields} from '../RenderApplicationFields';

describe('RenderFields', () => {
  test('renders short text field', () => {
    const field = fieldBuilder({type: 'short_text'});
    render(<RenderFields field={field} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders long text field', () => {
    const field = fieldBuilder({type: 'long_text'});
    render(<RenderFields field={field} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders phone number field', () => {
    const field = fieldBuilder({type: 'number'});
    render(<RenderFields field={field} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders email field', () => {
    const field = fieldBuilder({type: 'email'});
    render(<RenderFields field={field} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
