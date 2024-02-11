import { Form, redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Logo, FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch';

const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful!');
    return redirect('/login'); // As per docs redirect is to be used only inside actions
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
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
        <SubmitBtn />
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

Register.action = action;

export default Register;
