import React, { useState, useEffect, useContext } from 'react';
import { useGetProjects, useCreateActivity } from '../Api';
import { useNavigate, Link } from 'react-router-dom';
import ProjectContext from '../ProjectContext';  // Importe o contexto

function ActivityForm() {
  const [formData, setFormData] = useState({
    projectId: '',
    name: '',
    startDate: '',
    endDate: '',
    completed: false,
  });
  const navigate = useNavigate();
  const { refreshProjects } = useContext(ProjectContext);  // Use o contexto

  // Corrigindo a desestruturação para corresponder ao retorno do hook
  const { projects, error, loading } = useGetProjects();

  // O hook retorna um objeto com a função createActivity e não a função diretamente
  const { createActivity, error: createError, loading: createLoading } = useCreateActivity();

  useEffect(() => {
    if (error) {
      console.error('Error loading projects:', error);
    }
  }, [error]);

  useEffect(() => {
    if (createError) {
      console.error('Error creating activity:', createError);
    }
  }, [createError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createActivity(formData);

      // Atualiza o estado global de projetos
      refreshProjects();

      // Navega para a página do projeto após criar a atividade
      navigate(`/projects/${formData.projectId}`);
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">New Activity</h1>
      {loading ? (
        <div className="text-gray-500 text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">Error loading projects: {error.message}</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Project
            </label>
            <select
              required
              value={formData.projectId}
              onChange={(e) =>
                setFormData({ ...formData, projectId: Number(e.target.value) })
              }
              className="w-full p-2 border rounded"
            >
              <option value="">Select a project</option>
              {projects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Activity Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Start Date
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                End Date
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.completed}
                onChange={(e) =>
                  setFormData({ ...formData, completed: e.target.checked })
                }
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">Concluído</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={createLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {createLoading ? 'Creating...' : 'Create Activity'}
          </button>
        </form>
      )}
      <Link to="/activities" className="text-blue-500 hover:underline mt-4 inline-block">
        Back to Activities
      </Link>
    </div>
  );
}

export default ActivityForm;
