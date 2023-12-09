import {http, HttpResponse} from 'msw';

import {applications} from '../../features/ApplicationList/constants';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/api/applications`, () => {
    return HttpResponse.json(applications);
  }),
];
