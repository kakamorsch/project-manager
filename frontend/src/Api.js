const API_BASE = 'http://localhost:5000';

const handleSubmitData = async (data, endpoint, method = 'POST', id = null) => {
	const url = id ? `${API_BASE}/${endpoint}/${id}` : `${API_BASE}/${endpoint}`;

	try {
		const response = await fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error submitting data:', error);
		throw error;
	}
};

export const getProjects = async () => {
  const response = await fetch(`${API_BASE}/projetos`)
  return response.json()
}

export const getProject = async (id) => {
  const response = await fetch(`${API_BASE}/projetos/${id}`)
  return response.json()
}

export const deleteProject = async (id) => {
  await fetch(`${API_BASE}/projetos/${id}`, { method: 'DELETE' })
}

export const createProject = (projectData) =>
	handleSubmitData(projectData, 'projetos');

export const updateProject = (id, projectData) =>
	handleSubmitData(projectData, 'projetos', 'PUT', id);

export const getActivities = async () => {
	const response = await fetch(`${API_BASE}/atividades`);
	return response.json();
};

export const getActivity = async (id) => {
	const response = await fetch(`${API_BASE}/atividades/${id}`);
	return response.json();
};
export const deleteActivity = async (id) => {
	await fetch(`${API_BASE}/atividades/${id}`, { method: 'DELETE' });
};
export const createActivity = (activityData) =>
	handleSubmitData(activityData, 'atividades');

export const updateActivity = (id, activityData) =>
	handleSubmitData(activityData, 'atividades', 'PUT', id);

export const getProjectProgress = async (projectId) => {
	const response = await fetch(`${API_BASE}/projetos/${projectId}/conclusao`);
	return response.json();
};
