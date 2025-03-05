import React, { useState } from 'react';

const ActivityForm = ({ projectId }) => {
  const [activityName, setActivityName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFinalized, setIsFinalized] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar os dados da atividade para o backend
    const activityData = {
      projectId,
      name: activityName,
      startDate,
      endDate,
      finalized: isFinalized,
    };

    // Aqui você pode fazer uma chamada para a API para salvar a atividade
    console.log('Atividade cadastrada:', activityData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        placeholder="Nome da Atividade"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
        className="border p-2 mb-2"
        required
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 mb-2"
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 mb-2"
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
      <button type="submit" className="bg-blue-500 text-white p-2">
        Cadastrar Atividade
      </button>
    </form>
  );
};

export default ActivityForm;
