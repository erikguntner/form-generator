import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';

import {server} from './server';

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
