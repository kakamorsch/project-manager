import React, { useState, useContext } from 'react';
import { ProjectContext } from '../ProjectContext';
import { handleSubmitData } from '../Api';

const ProjectForm = () => {
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const { addProject } = useContext(ProjectContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!projectName || !startDate || !endDate) {
      setError('Por favor, preencha todos os campos do projeto.');
      return;
    }

    const projectData = {
      name: projectName,
      startDate,
      endDate,
    };

    try {
      const newProject = await handleSubmitData('/projetos', projectData);
      addProject(newProject); // Adiciona o projeto à store
      // Limpa os campos após o submit
      setProjectName('');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      setError('Erro ao cadastrar o projeto. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Criar Projeto</h2>
      <input
        type="text"
        placeholder="Nome do Projeto"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
 <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Criar Projeto
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default ProjectForm;
