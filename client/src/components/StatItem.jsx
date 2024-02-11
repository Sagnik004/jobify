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

export default StatItem;
