import {RootState} from '../../../redux/store';
import {render, screen} from '../../../utils/test/test-utils';
import {CenterWindow} from '../CenterWindow';
import {fieldBuilder} from '../constants';

const setup = (preloadedState: Partial<RootState> = {}) => {
  const {container} = render(<CenterWindow />, {
    preloadedState: {
      workspace: {fields: [], selectedId: null},
      ...preloadedState,
    },
  });

  return {container};
};

describe('CenterWindow', () => {
  test('renders the title, description and field for the selected component', () => {
    const fields = Array.from(Array(3), () =>
      fieldBuilder({
        type: 'short_text',
        properties: {description: 'description'},
      })
    );
    setup({workspace: {fields, selectedId: fields[0].id}});

    expect(screen.getByText(fields[0].title)).toBeInTheDocument();

    if (fields[0].properties.description) {
      expect(
        screen.getByText(fields[0].properties.description)
      ).toBeInTheDocument();
    }
  });
});
