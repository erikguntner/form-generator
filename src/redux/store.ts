import type {PreloadedStateShapeFromReducersMapObject} from '@reduxjs/toolkit';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({});

export const setupStore = (
  preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
