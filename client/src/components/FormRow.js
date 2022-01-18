const FormRow = (props) => {
  const { type, name, value, onInputChange, labelText } = props;

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        onChange={onInputChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
