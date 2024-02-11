import { Link, Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Logo, FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch';

const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful!');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  return (
    <Wrapper>
      <Form method='POST' className='form'>
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
        <SubmitBtn />
        <button type='button' className='btn btn-block'>
          Explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

Login.action = action;

export default Login;
