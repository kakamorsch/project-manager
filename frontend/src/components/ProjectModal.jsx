import PropTypes from 'prop-types';
import ProjectStatusBadge from './ui/ProjectStatusBadge';
const ActivityItem = ({ activity }) => {
	const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

	return (
		<div className="mb-4 p-4 border rounded-lg shadow-sm">
			<h4 className="text-lg font-semibold">{activity.name}</h4>
			<div
				className="flex justify-between mt-2 text-sm text-gray-500"
			>
				<span>{formatDate(activity.startDate)}</span>
				<span>{formatDate(activity.endDate)}</span>
        {
          activity.completed ? (
            <span className="bg-green-100 border rounded-lg p-1 text-green-800">
              Concluída
            </span>
          ):(
            <span className="bg-red-100 border rounded-lg p-1 text-red-800">
              Pendente
            </span>
          )
        }
			</div>
		</div>
	);
};

const ActivityList = ({ activities }) => (
	<div className="mt-6">
		<h3 className="text-xl font-bold mb-4">Atividades ({activities.length})</h3>
		{activities.map((activity) => (
			<ActivityItem key={activity.id} activity={activity} />
		))}
	</div>
);

const ProjectModal = ({ project, isOpen, onClose }) => {
	if (!isOpen) return null;

	const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

	return (
		<div
			className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
			onClick={onClose}
			role="dialog"
			aria-labelledby="modalTitle"
		>
			<div
				className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="absolute top-4 right-4 text-2xl hover:text-gray-700"
					onClick={onClose}
					aria-label="Fechar modal"
				>
					&times;
				</button>

				<header className="mb-6">
					<h1 id="modalTitle" className="text-3xl font-bold">
						{project.name}
					</h1>
					<div className="flex items-center gap-4 mt-2">
						<ProjectStatusBadge delayed={project.delayed} />
						<time className="text-gray-500">
							{formatDate(project.startDate)} - {formatDate(project.endDate)}
						</time>
					</div>
				</header>

				<ActivityList activities={project.activities} />
			</div>
		</div>
	);
};

ProjectModal.propTypes = {
	project: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		startDate: PropTypes.instanceOf(Date).isRequired,
		endDate: PropTypes.instanceOf(Date).isRequired,
		delayed: PropTypes.bool,
		activities: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				date: PropTypes.instanceOf(Date).isRequired,
				status: PropTypes.bool,
			}),
		).isRequired,
	}).isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ProjectModal;
