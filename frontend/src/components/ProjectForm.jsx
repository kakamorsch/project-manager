import React, { useState, useContext } from 'react';
import { ProjectContext } from '../ProjectContext';
import { handleSubmitData } from '../Api';

const ProjectForm = () => {
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const { addProject, fetchProjects } = useContext(ProjectContext);

  const handleProjectSubmit = async (e) => {
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
      fetchProjects(); // Atualiza a lista de projetos
      setProjectName('');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      setError('Erro ao cadastrar o projeto. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleProjectSubmit} className="mb-4">
      <h2 className="text-xl font-bold">Cadastrar Projeto</h2>
      <input
        type="text"
        placeholder="Nome do Projeto"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 mr-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Cadastrar Projeto</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default ProjectForm;
