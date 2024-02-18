import { useContext, createContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { JOB_SORT_BY } from '../../../utils/constants';

const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;

  return {
    queryKey: [
      'jobs',
      search ?? '',
      jobStatus ?? 'all',
      jobType ?? 'all',
      sort ?? JOB_SORT_BY.NEWEST_FIRST,
      page ?? 1,
    ],
    queryFn: async () => {
      const res = await customFetch.get('/jobs', { params });
      return res.data;
    },
  };
};

const loader = (queryClient) => {
  return async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
  };
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const data = useQuery(allJobsQuery(searchValues)).data;

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

AllJobs.loader = loader;

export default AllJobs;
