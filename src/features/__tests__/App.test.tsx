import {http, HttpResponse} from 'msw';

import {server} from '../../utils/test/server';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '../../utils/test/test-utils';
import App from '../App';
import {applications, formatDate} from '../ApplicationList/constants';

describe('App', () => {
  test('Renders all aplications', async () => {
    const applicationsList = applications;

    server.use(
      http.get(`${import.meta.env.VITE_API_BASE_URL}/api/applications`, () => {
        return HttpResponse.json(applicationsList);
      })
    );

    render(<App />);
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
      'My Applications'
    );
    expect(
      screen.getByRole('button', {name: /Create Application/i})
    ).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const applicationItems = screen.getAllByTestId('application-item');

    expect(applicationItems).toHaveLength(applicationsList.length);

    screen.getAllByTestId('application-item').forEach((item, index) => {
      const createdDate = formatDate(applicationsList[index].created_at);
      const updatedDate = formatDate(applicationsList[index].updated_at);

      expect(item).toHaveTextContent(applicationsList[index].name);
      expect(item).toHaveTextContent(`Created: ${createdDate}`);
      expect(item).toHaveTextContent(`${updatedDate}`);
    });
  });
});
