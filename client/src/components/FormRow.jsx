import PropTypes from 'prop-types';

const FormRow = (props) => {
  const { type, name, labelText, placeholder, isRequired } = props;

  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  );
};

FormRow.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool.isRequired,
};

export default FormRow;
