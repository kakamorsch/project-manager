import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'http://localhost:5000';

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchApi = useCallback(async (url, method = 'GET', body = null) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
      return jsonData;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetchApi };
};

export const useGetProjects = (refreshTrigger = 0) => {
  const { fetchApi, error, loading } = useApi();
  const [projects, setProjects] = useState(null);

  const loadProjects = useCallback(async () => {
    try {
      const data = await fetchApi(`${API_BASE}/projects`);
      setProjects(data);
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return null;
    }
  }, [fetchApi]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects, refreshTrigger]);

  return { projects, error, loading, refreshProjects: loadProjects };
};

export const useGetProject = (id) => {
  const { fetchApi, error, loading } = useApi();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchApi(`${API_BASE}/projects/${id}`);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    if (id) loadProject();
  }, [id, fetchApi]);

  return { project, error, loading };
};

export const useCreateProject = () => {
  const { fetchApi, error, loading } = useApi();

  const createProject = async (projectData) => {
    await fetchApi(`${API_BASE}/projects`, 'POST', projectData);
  };

  return { createProject, error, loading };
};

export const useCreateActivity = () => {
  const { fetchApi, error, loading } = useApi();

  const createActivity = async (activityData) => {
    await fetchApi(`${API_BASE}/activities`, 'POST', activityData);
  };

  return { createActivity, error, loading };
};


