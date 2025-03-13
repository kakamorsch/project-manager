import PropTypes from 'prop-types';

/**
 * @component
 * @description Exibe mensagens de erro estilizadas
 * @param {Object} props - Props do componente
 * @param {Error|string} [props.error] - Erro a ser exibido
 * @param {string} [props.className] - Classes CSS adicionais
 */
const ErrorMessage = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <p className={`text-red-500 text-xs italic ${className}`}>
      {typeof error === 'string' ? error : error.message}
    </p>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.instanceOf(Error),
    PropTypes.string,
  ]),
  className: PropTypes.string,
};

export default ErrorMessage;
