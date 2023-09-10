import { Link } from 'react-router-dom';

import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Login</h4>
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
        <button type='button' className='btn btn-block'>
          Explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
