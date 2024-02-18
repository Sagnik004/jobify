import { useQuery } from '@tanstack/react-query';

import { StatsContainer, ChartsContainer } from '../components';
import customFetch from '../utils/customFetch';

const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const res = await customFetch.get('/jobs/stats');
    return res.data;
  },
};

const loader = (queryClient) => {
  return async () => {
    const data = await queryClient.ensureQueryData(statsQuery);
    return data; // We can return null as well now, since in component we retrieve using useQuery
  };
};

const Stats = () => {
  const response = useQuery(statsQuery);
  const { data } = response;
  const { stats, monthlyApplications } = data;

  return (
    <>
      <StatsContainer stats={stats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

Stats.loader = loader;

export default Stats;
