import PropTypes from 'prop-types';

import Wrapper from '../assets/wrappers/JobInfo';

const JobInfo = (props) => {
  const { icon, text } = props;

  return (
    <Wrapper>
      <span className='job-icon'>{icon}</span>
      <span className='job-text'>{text}</span>
    </Wrapper>
  );
};

JobInfo.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string,
};

export default JobInfo;
