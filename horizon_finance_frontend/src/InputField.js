import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ id, type, name, placeholder, label, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="input-label">{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required
        className="input-field"
        {...rest}
      />
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
};

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default InputField;
