import PropTypes from 'prop-types';

/**
 * @component
 * @description Componente para encapsular estados de carregamento e erro
 * @param {Object} props - Props do componente
 * @param {boolean} props.isLoading - Indica se está carregando
 * @param {Error|null} props.error - Objeto de erro (opcional)
 * @param {ReactNode} props.children - Conteúdo a ser exibido quando não estiver carregando/erro
 * @example
 * <LoadingWrapper isLoading={true} error={null}>
 *   <Conteudo />
 * </LoadingWrapper>
 */
const LoadingWrapper = ({ isLoading, error, children }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">
          {error.message || 'Ocorreu um erro inesperado'}
        </p>
      </div>
    );
  }

  return children;
};

LoadingWrapper.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.instanceOf(Error),
    PropTypes.string,
    PropTypes.object,
  ]),
  children: PropTypes.node.isRequired,
};

LoadingWrapper.defaultProps = {
  isLoading: false,
  error: null,
};

export default LoadingWrapper;
