import React, { createContext, useState, useCallback } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);

  // Função para buscar projetos do backend
  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/projetos'); // URL do seu backend
      if (!response.ok) {
        throw new Error('Erro ao buscar projetos');
      }
      const data = await response.json();
      setProjects(data); // Atualiza o estado com os projetos recebidos
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  }, []);

  const addProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };

  const addActivity = (activity) => {
    setActivities((prev) => [...prev, activity]);
    setProjects((prev) => {
      return prev.map((project) => {
        if (project.id === activity.projectId) {
          return {
            ...project,
            activities: [...project.activities, activity], // Adiciona a nova atividade ao projeto
          };
        }
        return project;
      });
    });
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, fetchProjects, addActivity }}>
      {children}
    </ProjectContext.Provider>
  );
};
