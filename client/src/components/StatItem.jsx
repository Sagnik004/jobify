import PropTypes from 'prop-types';

import Wrapper from '../assets/wrappers/StatItem';

const StatItem = (props) => {
  const { count, title, icon, color, bgColor } = props;

  return (
    <Wrapper color={color} bcg={bgColor}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
};

StatItem.propTypes = {
  count: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.object,
  color: PropTypes.string,
  bgColor: PropTypes.string,
};

export default StatItem;
