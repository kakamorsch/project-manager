import React, { createContext, useState, useCallback } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/projetos');
      if (!response.ok) {
        throw new Error('Erro ao buscar projetos');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const addProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };

  const addActivity = (activity) => {
    setActivities((prev) => [...prev, activity]); // Adiciona a nova atividade ao estado
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, fetchProjects, addActivity }}>
      {children}
    </ProjectContext.Provider>
  );
};
