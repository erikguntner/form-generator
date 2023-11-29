import {render, screen} from '../../../utils/test/test-utils';
import {ApplicationList} from '..';
import {applications, formatDate} from '../constants';

const setup = () => {
  const applicationsList = applications;
  render(<ApplicationList applications={applicationsList} />);

  return {applications: applicationsList};
};

describe('ApplicationList', () => {
  test('Renders all application list items and information', () => {
    const {applications} = setup();

    expect(screen.getAllByTestId('application-item')).toHaveLength(
      applications.length
    );

    applications.forEach(({title, createdAt, updatedAt}) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(
        screen.getByText(`Created: ${formatDate(createdAt)}`)
      ).toBeInTheDocument();
      expect(screen.getByText(formatDate(updatedAt))).toBeInTheDocument();
    });
  });
});
