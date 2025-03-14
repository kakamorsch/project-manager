import PropTypes from 'prop-types';

/**
 * @component
 * @description Badge para mostrar o status do projeto
 * @param {Object} props - Props do componente
 * @param {boolean} props.delayed - Indica se o projeto está atrasado
 */
const ProjectStatusBadge = ({ delayed }) => {
  return delayed ? (
    <span className="bg-red-500 text-white py-1 px-2 rounded">Atrasado</span>
  ) : (
    <span className="bg-blue-500 text-white py-1 px-2 rounded">No prazo</span>
  );
};

ProjectStatusBadge.propTypes = {
  delayed: PropTypes.bool.isRequired,
};

export default ProjectStatusBadge;
