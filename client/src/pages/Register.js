import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Logo, FormRow, Alert } from "../components/index";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [inputValues, setInputValues] = useState(initialState);
  const {
    isLoading,
    showAlert,
    user,
    displayErrorAlert,
    registerUser,
    loginUser,
  } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = inputValues;
    if (!email || !password || (!isMember && !name)) {
      displayErrorAlert();
      return;
    }

    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  const handleToggleMember = () => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        isMember: !prevState.isMember,
      };
    });
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleFormSubmit}>
        <Logo />
        <h3>{inputValues.isMember ? "Login" : "Register"}</h3>

        {showAlert && <Alert />}

        {/* Name field */}
        {!inputValues.isMember && (
          <FormRow
            type='text'
            name='name'
            labelText='name'
            value={inputValues.name}
            onInputChange={handleInputChange}
          />
        )}

        {/* Email field */}
        <FormRow
          type='email'
          name='email'
          labelText='email'
          value={inputValues.email}
          onInputChange={handleInputChange}
        />

        {/* Password field */}
        <FormRow
          type='password'
          name='password'
          labelText='password'
          value={inputValues.password}
          onInputChange={handleInputChange}
        />

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          Submit
        </button>

        <p>
          {inputValues.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type='button'
            className='member-btn'
            onClick={handleToggleMember}
          >
            {inputValues.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
