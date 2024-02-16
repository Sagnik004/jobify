import PropTypes from 'prop-types';

const FormRow = (props) => {
  const {
    type,
    name,
    labelText,
    placeholder,
    defaultValue = '',
    handleChange,
  } = props;

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
        defaultValue={defaultValue}
        required
        onChange={handleChange}
      />
    </div>
  );
};

FormRow.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func,
};

export default FormRow;
