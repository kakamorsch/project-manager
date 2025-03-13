import { useContext } from 'react';
import ProjectContext from '../ProjectContext';
import LoadingWrapper from './ui/LoadingWrapper';
import Button from './ui/Button';

const ProjectList = () => {
  const { projects, loading, error } = useContext(ProjectContext);

  return (
    <div className="container mx-auto p-4">
      <LoadingWrapper isLoading={loading} error={error}>
        {projects.length > 0 ? (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project.id} className="p-4 border rounded shadow">
                <h2 className="text-xl font-bold">{project.name}</h2>
                <p>Start Date: {project.startDate}</p>
                <p>End Date: {project.endDate}</p>
                <Button variant="success" onClick={() => {/* Navigate to project details */}}>
                  View Details
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-6 bg-gray-100 rounded-lg">
            No projects found. Create your first project.
          </div>
        )}
      </LoadingWrapper>

      <Button variant="primary" onClick={() => {/* Navigate to new project form */}}>
        New Project
      </Button>
    </div>
  );
};

export default ProjectList;
