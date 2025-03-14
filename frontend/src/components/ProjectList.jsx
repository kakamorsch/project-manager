import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectContext from '../contexts/ProjectContext';
import { useDeleteProject } from '../services/Api';
import Button from './ui/Button';
import LoadingWrapper from './ui/LoadingWrapper';
import ProjectModal from './ProjectModal';
import ProjectStatusBadge from './ui/ProjectStatusBadge';

const ProjectList = () => {
	const { projects, loading, error, refreshProjects } =
		useContext(ProjectContext);
	const [selectedProject, setSelectedProject] = useState(null);

	const ProjectDeleteButton = ({ projectId }) => {
		const { deleteProject, loading: deleteLoading } =
			useDeleteProject(projectId);

		const handleDelete = async () => {
			if (window.confirm('Tem certeza de que deseja excluir este projeto?')) {
				try {
					await deleteProject();
					refreshProjects();
				} catch (err) {
					console.error('Falha ao excluir o projeto:', err);
				}
			}
		};

		return (
			<Button
				onClick={handleDelete}
				variant="danger"
				loading={deleteLoading}
				disabled={deleteLoading}
			>
				{deleteLoading ? 'Excluindo...' : 'Excluir'}
			</Button>
		);
	};

	const Table = ({ projects, onRowClick }) => (
		<div className="overflow-x-auto shadow-md rounded-lg">
			<table className="min-w-full bg-white">
				<thead className="bg-gray-800 text-white">
					<tr>
						<th className="text-left py-3 px-4 uppercase font-semibold text-sm">
							Nome
						</th>
						<th className="text-left py-3 px-4 uppercase font-semibold text-sm">
							Início
						</th>
						<th className="text-left py-3 px-4 uppercase font-semibold text-sm">
							Fim
						</th>
						<th className="text-left py-3 px-4 uppercase font-semibold text-sm">
							Progresso
						</th>
						<th className="text-left py-3 px-4 uppercase font-semibold text-sm">
							Status
						</th>
						<th className="text-left py-3 px-4 uppercase font-semibold text-sm">
							Ações
						</th>
					</tr>
				</thead>
				<tbody className="text-gray-700">
					{projects.map((project) => (
						<tr
							key={project.id}
							className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer transition-colors"
							onClick={() => onRowClick(project)}
						>
							<td className="py-3 px-4">{project.name}</td>
							<td className="py-3 px-4">
								{new Date(project.startDate).toLocaleDateString()}
							</td>
							<td className="py-3 px-4">
								{new Date(project.endDate).toLocaleDateString()}
							</td>
							<td className="py-3 px-4">
								<div className="flex items-center">
									<div className="w-full bg-gray-200 rounded-full h-2.5">
										<div
											className="bg-blue-600 h-2.5 rounded-full"
											style={{ width: `${project.completionPercentage}%` }}
										></div>
									</div>
									<span className="ml-2 text-sm">
										{project.completionPercentage?.toFixed(1)}%
									</span>
								</div>
							</td>
							<td className="py-3 px-4">
								<ProjectStatusBadge delayed={project.delayed} />
							</td>
							<td className="py-3 px-4 flex items-center justify-between">
								<Button
									variant="primary"
									onClick={(e) => {
										e.stopPropagation();
										onRowClick(project);
									}}
								>
									Detalhes
								</Button>
								<ProjectDeleteButton projectId={project.id} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

	return (
		<div className="container mx-auto p-4">
			<ProjectModal
				project={selectedProject}
				isOpen={!!selectedProject}
				onClose={() => setSelectedProject(null)}
			/>

			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-blue-600">Lista de projetos</h1>
				<Link to="/projects/new">
					<Button variant="success">Criar Projeto</Button>
				</Link>
			</div>

			<LoadingWrapper isLoading={loading} error={error}>
				{projects && projects.length > 0 ? (
					<Table projects={projects} onRowClick={setSelectedProject} />
				) : (
					<div className="mt-4 text-gray-500 text-center p-6 bg-gray-100 rounded-lg">
						Nenhum projeto encontrado. Clique em 'Criar projeto' para criar um.
					</div>
				)}
			</LoadingWrapper>
		</div>
	);
};

export default ProjectList;
