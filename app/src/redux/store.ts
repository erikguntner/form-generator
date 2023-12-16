import {configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit';

import workspace from '../features/ApplicationWorkspace/workspaceSlice';
import {emptySplitApi} from '../services/emptyApi';

export const setupStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) => {
  return configureStore({
    reducer: {
      [emptySplitApi.reducerPath]: emptySplitApi.reducer,
      workspace,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(emptySplitApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
    ...options,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
