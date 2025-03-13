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
  const response = await fetch(`${API_BASE}/projects`)
  return response.json()
}

export const getProject = async (id) => {
  const response = await fetch(`${API_BASE}/projects/${id}`)
  return response.json()
}

export const deleteProject = async (id) => {
  await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' })
}

export const createProject = (projectData) =>
	handleSubmitData(projectData, 'projects');

export const updateProject = (id, projectData) =>
	handleSubmitData(projectData, 'projects', 'PUT', id);

export const getActivities = async () => {
	const response = await fetch(`${API_BASE}/activities`);
	return response.json();
};

export const getActivity = async (id) => {
	const response = await fetch(`${API_BASE}/activities/${id}`);
	return response.json();
};
export const deleteActivity = async (id) => {
	await fetch(`${API_BASE}/activities/${id}`, { method: 'DELETE' });
};
export const createActivity = (activityData) =>
	handleSubmitData(activityData, 'activities');

export const updateActivity = (id, activityData) =>
	handleSubmitData(activityData, 'activities', 'PUT', id);

