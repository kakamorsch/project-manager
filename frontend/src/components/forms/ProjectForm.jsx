import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateProject } from '../../services/Api';
import ProjectContext from '../../contexts/ProjectContext';
import Button from '../ui/Button';
import FormField from '../ui/FormField';
import DateInput from '../ui/DateInput';
import ErrorMessage from '../ui/ErrorMessage';

export default function ProjectForm() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { refreshProjects } = useContext(ProjectContext);
	const [formData, setFormData] = useState({
		name: '',
		startDate: '',
		endDate: '',
	});

	const { createProject, error, loading } = useCreateProject();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProject(formData);
			await refreshProjects();
			navigate('/projects');
		} catch (err) {
			console.error('Erro ao criar o projeto:', err);
		}
	};

	return (
		<div className="container mx-auto p-4 max-w-2xl">
			<h1 className="text-3xl font-bold mb-6 text-blue-600">
				{id ? 'Editar Projeto' : 'Novo Projeto'}
			</h1>

			<ErrorMessage message={error} />

			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				<FormField label="Nome do Projeto" htmlFor="name">
					<input
						type="text"
						id="name"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						required
						className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
					/>
				</FormField>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<DateInput
						label="Data de início"
						value={formData.startDate}
						onChange={(value) => setFormData({ ...formData, startDate: value })}
						required
					/>

					<DateInput
						label="Data de fim"
						value={formData.endDate}
						onChange={(value) => setFormData({ ...formData, endDate: value })}
						required
					/>
				</div>

				<div className="flex items-center justify-between gap-4">
					<Button
						type="submit"
						variant="primary"
						loading={loading}
						disabled={loading}
					>
						{loading ? 'Salvando...' : 'Salvar'}
					</Button>

					<Button
						type="button"
						variant="secondary"
						onClick={() => navigate('/projects')}
					>
						Cancelar
					</Button>
				</div>
			</form>
		</div>
	);
}
