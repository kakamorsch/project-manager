import { useGetProjects } from '../../services/Api';
import { useCreateActivity } from '../../services/Api';
import { BaseForm, FormField, Input, DateInput } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ProjectContext from '../../contexts/ProjectContext';
const ActivityForm = () => {
	const { projects } = useGetProjects();
	const { createActivity, isLoading } = useCreateActivity();
	const navigate = useNavigate();
	const { refreshProjects } = useContext(ProjectContext);
	const handleSubmit = async (values) => {
		try {
			await createActivity(values);
			await refreshProjects();
			navigate('/projects');
		} catch (error) {
			console.error('Error creating activity:', error);
		}
	};
	return (
		<div className="max-w-2xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">Nova Atividade</h1>

			<BaseForm
				initialValues={{
					projectId: '',
					name: '',
					startDate: '',
					endDate: '',
					completed: false,
				}}
				validationSchema="activity"
				onSubmit={handleSubmit}
				submitText={isLoading ? 'Salvando...' : 'Criar Atividade'}
			>
				{({ values, errors, handleChange }) => (
					<>
						<FormField label="Projeto" error={errors.projectId}>
							<select
								name="projectId"
								value={values.projectId}
								onChange={handleChange}
								className="input-field"
								required
							>
								<option value="">Selecione um projeto</option>
								{projects?.map((project) => (
									<option key={project.id} value={project.id}>
										{project.name}
									</option>
								))}
							</select>
						</FormField>

						<FormField
							label="Nome da Atividade"
							error={errors.name}
							htmlFor="name"
						>
							<Input
								id="name"
								name="name"
								value={values.name}
								onChange={handleChange}
								disabled={isLoading}
								required
							/>
						</FormField>

						<FormField
							label="Data de Início"
							error={errors.startDate}
							htmlFor="startDate"
						>
							<DateInput
								id="startDate"
								name="startDate"
								value={values.startDate}
								onChange={handleChange}
								disabled={isLoading}
								required
							/>
						</FormField>

						<FormField
							label="Data de Término"
							error={errors.endDate}
							htmlFor="endDate"
						>
							<DateInput
								id="endDate"
								name="endDate"
								value={values.endDate}
								onChange={handleChange}
								disabled={isLoading}
								required
							/>
						</FormField>
						<FormField
							label="Concluído"
							error={errors.completed}
							htmlFor="completed"
						>
							<input
								type="checkbox"
								id="completed"
								name="completed"
								checked={values.completed}
								onChange={handleChange}
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								disabled={isLoading}
							/>
						</FormField>
					</>
				)}
			</BaseForm>
		</div>
	);
};

export default ActivityForm;
