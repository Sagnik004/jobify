import { Link } from 'react-router-dom';

import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow } from '../components';

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Register Page</h4>
        <FormRow
          type='text'
          name='name'
          placeholder='Enter your first name'
          isRequired={true}
        />
        <FormRow
          type='text'
          name='lastName'
          labelText='Last name'
          placeholder='Enter your last name'
          isRequired={true}
        />
        <FormRow
          type='text'
          name='location'
          placeholder='Enter your location'
          isRequired={true}
        />
        <FormRow
          type='email'
          name='email'
          placeholder='Enter your email'
          isRequired={true}
        />
        <FormRow
          type='password'
          name='password'
          placeholder='Enter your password'
          isRequired={true}
        />
        <button type='submit' className='btn btn-block'>
          Submit
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login Page
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
