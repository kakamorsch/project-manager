
const DateInput = ({ name, value, onChange, disabled, className, ...props }) => (
  <input
    type="date"
    name={name}
    value={value}
    onChange={e => onChange({
      target: {
        name,
        value: e.target.value
      }
    })}
    disabled={disabled}
    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${className}`}
    {...props}
  />
);



export default DateInput;
