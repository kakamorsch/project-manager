import PropTypes from 'prop-types';

/**
 * @component
 * @description Campo de entrada para datas com validação
 * @param {Object} props - Props do componente
 * @param {string} props.label - Rótulo do campo
 * @param {string} props.value - Valor atual
 * @param {Function} props.onChange - Manipulador de alteração
 * @param {boolean} [props.required] - Indica se o campo é obrigatório
 */
const DateInput = ({ label, value, onChange, required = false }) => {
  return (
    <div className="w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        required={required}
      />
    </div>
  );
};

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default DateInput;
