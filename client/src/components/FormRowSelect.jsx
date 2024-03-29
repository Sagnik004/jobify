import PropTypes from 'prop-types';

const FormRowSelect = (props) => {
  const { name, labelText, list, defaultValue = '', handleChange } = props;

  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className='form-select'
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

FormRowSelect.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  list: PropTypes.array,
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func,
};

export default FormRowSelect;
