import {render, screen} from '../../utils/test/test-utils';
import App from '../App';

describe('App', () => {
  test('Renders counter', () => {
    render(<App />);
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
      'My Applications'
    );
    expect(
      screen.getByRole('button', {name: /Create Application/i})
    ).toBeInTheDocument();
  });
});
