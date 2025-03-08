import React, { useContext, useEffect } from 'react';
import { ProjectContext } from '../ProjectContext';

const ProjectList = () => {
  const { projects, fetchProjects } = useContext(ProjectContext);

  useEffect(() => {
    fetchProjects(); // Busca os projetos ao montar o componente
  }, [fetchProjects]);

  return (
    <div className="space-y-4">
      {projects.map((project) => {
        // Verifica se o projeto está atrasado
        const isDelayed = new Date(project.endDate) < new Date();
        // Verifica se o projeto está pendente (não finalizado e dentro do prazo)
        const isPending = !isDelayed && !project.activities.every(activity => activity.finalized);

        return (
          <div key={project.id} className={`p-4 border rounded shadow ${isDelayed ? 'bg-red-100' : 'bg-white'}`}>
            <h2 className="text-xl font-bold">{project.name}</h2>
            <p className="text-gray-600">Duração: {project.startDate} a {project.endDate}</p>
            <p className={`font-semibold ${isDelayed ? 'text-red-600' : isPending ? 'text-yellow-600' : 'text-green-600'}`}>
              Status: {isDelayed ? 'Atrasado' : isPending ? 'Pendente' : 'Concluído'}
            </p>
            <ul className="mt-2">
              {project.activities.map((activity) => (
                <li key={activity.id} className="flex justify-between items-center border-b py-2">
                  <span>{activity.name}</span>
                  <span className={`font-bold ${activity.finalized ? 'text-green-500' : 'text-red-500'}`}>
                    {activity.finalized ? '(Finalizada)' : '(Não finalizada)'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
