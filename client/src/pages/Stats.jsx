import { useLoaderData } from 'react-router-dom';

import { StatsContainer, ChartsContainer } from '../components';
import customFetch from '../utils/customFetch';

const loader = async () => {
  try {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { stats, monthlyApplications } = useLoaderData();

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
