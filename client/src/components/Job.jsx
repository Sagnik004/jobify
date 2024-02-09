import { Link, Form } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';

day.extend(advancedFormat);

const Job = (props) => {
  const { _id, position, company, jobLocation, jobType, createdAt, jobStatus } =
    props;

  const date = day(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        <footer className='actions'>
          <Link className='btn edit-btn'>Edit</Link>
          <Form>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

Job.propTypes = {
  _id: PropTypes.string,
  position: PropTypes.string,
  company: PropTypes.string,
  jobLocation: PropTypes.string,
  jobType: PropTypes.string,
  createdAt: PropTypes.string,
  jobStatus: PropTypes.string,
};

export default Job;
