import React, { useContext, useEffect } from 'react';
import { ProjectContext } from '../ProjectContext';

const ProjectList = () => {
  const { projects, fetchProjects } = useContext(ProjectContext);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        await fetchProjects(); // Chama a função fetchProjects do contexto
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    fetchProjectsData(); // Busca os projetos ao montar o componente
  }, []); // Array de dependências vazio para evitar loop

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.length === 0 ? (
        <p>Nenhum projeto cadastrado.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{project.name}</h2>
            <p>Data de Início: {new Date(project.startDate).toLocaleDateString()}</p>
            <p>Data de Fim: {new Date(project.endDate).toLocaleDateString()}</p>
            <p>% Completo: {project.completionPercentage}</p>
            <p>Atrasado: {project.isDelayed}</p>
            <div className="mt-2">
              <h3 className="font-semibold">Atividades:</h3>
              {project.activities.length > 0 ? (
                <ul>
                  {project.activities.map((activity) => (
                    <li key={activity.id} className="ml-4">
                      {activity.name} - {new Date(activity.startDate).toLocaleDateString()} a {new Date(activity.endDate).toLocaleDateString()} {activity.finalized ? '(Finalizada)' : ''}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="ml-4">Nenhuma atividade cadastrada.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;
