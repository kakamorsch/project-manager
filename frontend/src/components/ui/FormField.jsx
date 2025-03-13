import PropTypes from 'prop-types';
/**
 * @component
 * @description Campo de formulário com label e tratamento de erros
 * @param {Object} props - Props do componente
 * @param {string} [props.label] - Texto do label
 * @param {ReactNode} props.children - Elemento do formulário
 * @param {Object} [props.error] - Objeto de erro (ex: { message: 'Erro' })
 * @param {string} [props.htmlFor] - ID do elemento associado
 * @example
 * <FormField label="Email" error={errors.email}>
 *   <input type="email" />
 * </FormField>
 */
const FormField = ({ label, children, error }) => (
  <div className="space-y-2 mb-4">
    {label && <label className="block text-gray-700 text-sm font-bold">{label}</label>}
    {children}
    {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
  </div>
);

FormField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default FormField;
