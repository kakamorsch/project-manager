import PropTypes from 'prop-types';
/**
 * @component
 * @description Botão estilizado com variantes pré-definidas
 * @param {Object} props - Props do componente
 * @param {ReactNode} props.children - Conteúdo do botão
 * @param {'primary'|'danger'|'success'|'secondary'} [props.variant='primary'] - Tipo de variação visual
 * @param {boolean} [props.loading=false] - Estado de carregamento
 * @param {string} [props.className] - Classes CSS adicionais
 * @param {Object} props.rest - Demais props de elemento HTML
 * @example
 * <Button variant="primary" loading={isLoading}>
 *   Salvar
 * </Button>
 */
const Button = ({ children, variant = 'primary', loading, ...props }) => {
  const baseStyle = "font-bold py-2 px-4 rounded transition-colors";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
    success: "bg-green-500 hover:bg-green-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'danger', 'success', 'secondary']),
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default Button;
