import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);

  const addProject = (project) => {
    setProjects((prev) => [...prev, project]); // Atualiza o estado com o novo projeto
  };

  const addActivity = (activity) => {
    setActivities((prev) => [...prev, activity]);
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/projetos');
      if (!response.ok) {
        throw new Error('Erro ao buscar projetos');
      }
      const data = await response.json();
      setProjects(data); // Atualiza o estado com os projetos buscados
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, activities, addProject, addActivity, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};
