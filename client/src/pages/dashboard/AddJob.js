import { FormRow, FormRowSelect, Alert } from "../../components/index";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const {
    isLoading,
    showAlert,
    isEditing,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    jobStatus,
    jobStatusOptions,
    displayErrorAlert,
    handleChange,
    clearValues,
    createJob,
  } = useAppContext();

  const handleJobInputChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayErrorAlert();
      return;
    }

    if (isEditing) {
      return;
    }

    createJob();
  };

  const handleFormClear = (e) => {
    e.preventDefault();
    clearValues();
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          {/* Position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            onInputChange={handleJobInputChange}
          />

          {/* Company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            onInputChange={handleJobInputChange}
          />

          {/* Location */}
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            onInputChange={handleJobInputChange}
          />

          {/* Job Status */}
          <FormRowSelect
            labelText="status"
            name="jobStatus"
            value={jobStatus}
            handleOptionsChange={handleJobInputChange}
            list={jobStatusOptions}
          />

          {/* Job Type */}
          <FormRowSelect
            labelText="job type"
            name="jobType"
            value={jobType}
            handleOptionsChange={handleJobInputChange}
            list={jobTypeOptions}
          />

          {/* Action Buttons */}
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              disabled={isLoading}
              onClick={handleFormSubmit}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              disabled={isLoading}
              onClick={handleFormClear}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
