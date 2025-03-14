import PropTypes from 'prop-types';

const FormField = ({ label, children, error, htmlFor }) => (
  <div className="mb-6">
    {label && (
      <label
        htmlFor={htmlFor}
        className="block text-gray-700 text-sm font-semibold mb-2"
      >
        {label}
      </label>
    )}
    <div className="relative">
      {children}
      {error && (
        <span
          role="alert"
          className="absolute -bottom-5 left-0 text-red-500 text-xs italic mt-1"
        >
          {error.message}
        </span>
      )}
    </div>
  </div>
);

FormField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string
  }),
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string
};

export default FormField;
