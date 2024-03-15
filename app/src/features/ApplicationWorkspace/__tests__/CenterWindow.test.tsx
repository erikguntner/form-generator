import {RootState} from '../../../redux/store';
import {render, screen} from '../../../utils/test/test-utils';
import {CenterWindow} from '../CenterWindow';
import {fieldBuilder, fieldGroupBuilder} from '../constants';

const setup = (preloadedState: Partial<RootState> = {}) => {
  const {container} = render(<CenterWindow />, {
    preloadedState: {
      workspace: {fieldGroups: [], selectedId: null},
      ...preloadedState,
    },
  });

  return {container};
};

describe('CenterWindow', () => {
  test('renders the title and fields for the selected field group', () => {
    const fields = Array.from(Array(3), () => fieldBuilder());
    const fieldGroups = Array.from(Array(3), () => fieldGroupBuilder({fields}));

    setup({workspace: {fieldGroups, selectedId: fieldGroups[0].id}});

    expect(screen.getByText(fieldGroups[0].title)).toBeInTheDocument();

    if (fieldGroups[0].fields[0].properties.description) {
      expect(
        screen.getByText(fieldGroups[0].fields[0].properties.description)
      ).toBeInTheDocument();
    }
  });
});
