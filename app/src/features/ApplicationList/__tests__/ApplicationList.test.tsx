import {BrowserRouter} from 'react-router-dom';

import {render, screen} from '../../../utils/test/test-utils';
import {ApplicationList} from '..';
import {applications, formatDate} from '../constants';

const setup = () => {
  const applicationsList = applications;
  render(
    <BrowserRouter>
      <ApplicationList applications={applicationsList} />
    </BrowserRouter>
  );

  return {applications: applicationsList};
};

describe('ApplicationList', () => {
  test('Renders all application list items and information', () => {
    const {applications} = setup();

    expect(screen.getAllByTestId('application-item')).toHaveLength(
      applications.length
    );

    applications.forEach(({name, created_at, updated_at}) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(
        screen.getByText(`Created: ${formatDate(created_at)}`)
      ).toBeInTheDocument();
      expect(screen.getByText(formatDate(updated_at))).toBeInTheDocument();
    });
  });
});
