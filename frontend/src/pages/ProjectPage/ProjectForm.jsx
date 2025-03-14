import { useCreateProject } from '../../services/Api';
import { BaseForm, FormField, Input, DateInput } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ProjectContext from '../../contexts/ProjectContext';
const ProjectForm = () => {
	const { createProject, isLoading } = useCreateProject();
	const navigate = useNavigate();
	const { refreshProjects } = useContext(ProjectContext);
	const handleSubmit = async (values) => {
		try {
			await createProject(values);
			await refreshProjects();
			navigate('/projects');
		} catch (error) {
			console.error('Error creating project:', error);
		}
	};
	return (
		<div className="max-w-2xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">Novo Projeto</h1>

			<BaseForm
				initialValues={{ name: '', startDate: '', endDate: '' }}
				validationSchema="project"
				onSubmit={handleSubmit}
				submitText={isLoading ? 'Salvando...' : 'Criar Projeto'}
			>
				{({ values, errors, handleChange }) => (
					<>
						<FormField label="Nome do Projeto" error={errors.name}>
							<Input
								name="name"
								value={values.name}
								onChange={handleChange}
								required
							/>
						</FormField>

						<FormField label="Data de Início" error={errors.startDate}>
							<DateInput
								name="startDate"
								value={values.startDate}
								onChange={handleChange}
								required
							/>
						</FormField>

						<FormField label="Data de Término" error={errors.endDate}>
							<DateInput
								name="endDate"
								value={values.endDate}
								onChange={handleChange}
								required
							/>
						</FormField>
					</>
				)}
			</BaseForm>
		</div>
	);
};

export default ProjectForm;
