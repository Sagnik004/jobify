import { useState } from "react";

import { FormRow, Alert } from "../../components/index";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user, showAlert, isLoading, displayErrorAlert, updateUser } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !lastName || !location) {
      displayErrorAlert();
      return;
    }

    updateUser({ name, email, lastName, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleFormSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          {/* Name */}
          <FormRow
            type="text"
            name="name"
            value={name}
            onInputChange={(e) => setName(e.target.value)}
          />

          {/* Last Name */}
          <FormRow
            labelText="last name"
            type="text"
            name="lastName"
            value={lastName}
            onInputChange={(e) => setLastName(e.target.value)}
          />

          {/* Email */}
          <FormRow
            type="email"
            name="email"
            value={email}
            onInputChange={(e) => setEmail(e.target.value)}
          />

          {/* Location */}
          <FormRow
            type="text"
            name="location"
            value={location}
            onInputChange={(e) => setLocation(e.target.value)}
          />

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
