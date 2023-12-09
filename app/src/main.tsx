import './index.css';

import {ThemeProvider} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {setupStore} from './redux/store.ts';
import theme from './utils/theme.tsx';
import {App, ApplicationWorkspace} from './views';

const store = setupStore();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/application/:id',
    element: <ApplicationWorkspace />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
