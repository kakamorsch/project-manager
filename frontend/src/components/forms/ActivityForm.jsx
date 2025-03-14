import { useState, useEffect, useContext } from 'react';
import { useGetProjects, useCreateActivity } from '../../services/Api';
import { useNavigate, Link } from 'react-router-dom';
import ProjectContext from '../../contexts/ProjectContext';
import Button from '../ui/Button';
import FormField from '../ui/FormField';
import DateInput from '../ui/DateInput';
import ErrorMessage from '../ui/ErrorMessage';

function ActivityForm() {
  const [formData, setFormData] = useState({
    projectId: '',
    name: '',
    startDate: '',
    endDate: '',
    completed: false,
  });

  const navigate = useNavigate();
  const { refreshProjects } = useContext(ProjectContext);
  const { projects, error, loading } = useGetProjects();
  const { createActivity, error: createError, loading: createLoading } = useCreateActivity();

  useEffect(() => {
    if (error) console.error('Erro ao carregar projetos:', error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createActivity(formData);
      await refreshProjects();
      navigate(`/projects`);
    } catch (error) {
      console.error('Erro ao criar a atividade:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Nova atividade</h1>

      <FormField label="Projeto" error={error}>
        <select
          required
          value={formData.projectId}
          onChange={(e) => setFormData({ ...formData, projectId: Number(e.target.value) })}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione um projeto</option>
          {projects?.map((project) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Nome da atividade" error={createError}>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
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

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={formData.completed}
          onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
          className="mr-2"
        />
        <label className="text-gray-700">Concluída</label>
      </div>

      <ErrorMessage error={createError} className="mb-4" />

      <div className="flex justify-between">
        <Button
          variant="primary"
          onClick={handleSubmit}
          loading={createLoading}
        >
          Criar atividade
        </Button>
        <Link to="/projects">
          <Button variant="secondary">Cancelar</Button>
        </Link>
      </div>
    </div>
  );
}

export default ActivityForm;
