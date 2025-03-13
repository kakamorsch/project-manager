import { createContext, useState, useEffect, useCallback } from 'react';
import { useGetProjects } from './Api';

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const { projects: apiProjects, error: apiError, loading: apiLoading, refreshProjects } = useGetProjects();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (apiError) {
      setError(apiError);
    } else if (apiProjects) {
      setProjects(apiProjects);
    }
  }, [apiProjects, apiError]);

  useEffect(() => {
    setLoading(apiLoading);
  }, [apiLoading]);

  const refreshProjectsHandler = useCallback(async () => {
    setLoading(true);
    try {
      await refreshProjects();
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [refreshProjects]);

  const updateProjects = useCallback((newProjects) => {
    setProjects(newProjects);
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, loading, error, refreshProjects: refreshProjectsHandler, updateProjects }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectContext;
