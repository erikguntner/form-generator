import {render, screen} from '../../utils/test/test-utils';
import App from '../App';

describe('App', () => {
  test('Renders counter', () => {
    render(<App />);
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
      'My Applications'
    );
    expect(screen.getByRole('button')).toHaveTextContent('Create Application');
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(
      'No Applications'
    );
  });
});
