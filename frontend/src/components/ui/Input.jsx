import PropTypes from 'prop-types';

const Input = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  disabled,
  placeholder,
  className = '',
  ...props
}) => (
  <input
    id={id}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    disabled={disabled}
    placeholder={placeholder}
    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${className}`}
    {...props}
  />
);

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default Input;
