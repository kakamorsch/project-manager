import React, { useState, useEffect } from 'react';
import { getProjects, createActivity } from '../Api';
import { useNavigate, Link } from 'react-router-dom';
function ActivityForm() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    projectId: '',
    name: '',
    startDate: '',
    endDate: '',
    finalized: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    getProjects().then(response => {
      return setProjects(response)
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createActivity(formData);
      navigate('/projects');
    } catch (error) {
      console.error('Erro ao criar atividade:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Nova Atividade</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Projeto
          </label>
          <select
            required
            value={formData.projectId}
            onChange={(e) => setFormData({...formData, projectId: Number(e.target.value)})}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione um projeto</option>
            {projects?.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nome da Atividade
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Data de Início
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Data de Término
            </label>
            <input
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.finalized}
            onChange={(e) => setFormData({...formData, finalized: e.target.checked})}
            className="mr-2"
          />
          <label className="text-gray-700 text-sm">Finalizada</label>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Salvar
          </button>
          <Link to="/projects" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ActivityForm;
