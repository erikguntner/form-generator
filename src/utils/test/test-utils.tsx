import {ThemeProvider} from '@mui/material';
import {render, RenderOptions} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ReactElement} from 'react';
import {Provider} from 'react-redux';

import {AppStore, RootState, setupStore} from '../../redux/store';
import theme from '../theme';

interface ProviderProps {
  children: ReactElement;
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const AllTheProviders = ({children}: ProviderProps) => {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    );
  };

  return render(ui, {wrapper: AllTheProviders, ...renderOptions});
};

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export {customRender as render, userEvent};
