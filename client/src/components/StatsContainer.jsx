import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

const StatsContainer = ({ stats }) => {
  const displayStats = [
    {
      title: 'Pending applications',
      count: stats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      title: 'Interviews scheduled',
      count: stats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bgColor: '#e0e8f9',
    },
    {
      title: 'Jobs declined',
      count: stats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bgColor: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {displayStats.map((stat) => (
        <StatItem key={stat.title} {...stat} />
      ))}
    </Wrapper>
  );
};

StatsContainer.propTypes = {
  stats: PropTypes.object,
};

export default StatsContainer;
