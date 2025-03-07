// Api.js
export const handleSubmitData = async (endpoint, data) => {
  const response = await fetch(`http://localhost:5000${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erro ao enviar dados');
  }

  return await response.json(); // Retorna a resposta JSON
};
