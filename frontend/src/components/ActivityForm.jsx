import React, { useState, useContext } from 'react';
import { ProjectContext } from '../ProjectContext';
import { handleSubmitData } from '../Api';

const ActivityForm = () => {
  const [activityName, setActivityName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFinalized, setIsFinalized] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [error, setError] = useState('');
  const { projects, addActivity } = useContext(ProjectContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!activityName || !startDate || !endDate || !selectedProjectId) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const activityData = {
      projectId: Number(selectedProjectId), // Converte para número
      name: activityName,
      startDate,
      endDate,
      finalized: isFinalized,
    };

    try {
      const newActivity = await handleSubmitData('/atividades', activityData);
      addActivity(newActivity); // Adiciona a atividade à store
      // Limpa os campos após o submit
      setActivityName('');
      setStartDate('');
      setEndDate('');
      setIsFinalized(false);
      setSelectedProjectId('');
    } catch (err) {
      setError('Erro ao cadastrar a atividade. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Adicionar Atividade</h2>
      <select
        value={selectedProjectId}
        onChange={(e) => setSelectedProjectId(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      >
        <option value="">Selecione um Projeto</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Nome da Atividade"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
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
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={isFinalized}
          onChange={(e) => setIsFinalized(e.target.checked)}
          className="mr-2"
        />
        Finalizada?
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Cadastrar Atividade
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default ActivityForm;
