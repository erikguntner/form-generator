import {emptySplitApi as api} from './emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    postApplication: build.mutation<
      PostApplicationApiResponse,
      PostApplicationApiArg
    >({
      query: queryArg => ({
        url: `/application`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getApplicationByApplicationId: build.query<
      GetApplicationByApplicationIdApiResponse,
      GetApplicationByApplicationIdApiArg
    >({
      query: queryArg => ({url: `/application/${queryArg.applicationId}`}),
    }),
    getApplications: build.query<
      GetApplicationsApiResponse,
      GetApplicationsApiArg
    >({
      query: () => ({url: `/applications`}),
    }),
  }),
  overrideExisting: false,
});
export {injectedRtkApi as applicationApi};
export type PostApplicationApiResponse =
  /** status 200 application response */ {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
export type PostApplicationApiArg = {
  body: {
    name: string;
  };
};
export type GetApplicationByApplicationIdApiResponse =
  /** status 200 application response */ {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
export type GetApplicationByApplicationIdApiArg = {
  applicationId: string;
};
export type GetApplicationsApiResponse =
  /** status 200 applications response */ {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }[];
export type GetApplicationsApiArg = void;
export const {
  usePostApplicationMutation,
  useGetApplicationByApplicationIdQuery,
  useGetApplicationsQuery,
} = injectedRtkApi;
