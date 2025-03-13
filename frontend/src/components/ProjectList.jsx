import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProjectContext from '../ProjectContext';
import { useDeleteProject } from '../Api';
import Button from './ui/Button';
import LoadingWrapper from './ui/LoadingWrapper';

const ProjectList = () => {
  const { projects, loading, error, refreshProjects } = useContext(ProjectContext);

  const ProjectDeleteButton = ({ projectId }) => {
    const { deleteProject, loading: deleteLoading } = useDeleteProject(projectId);

    const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this project?')) {
        try {
          await deleteProject();
          refreshProjects();
        } catch (err) {
          console.error('Failed to delete project:', err);
        }
      }
    };

    return (
      <Button
        onClick={handleDelete}
        variant="danger"
        loading={deleteLoading}
        disabled={deleteLoading}
      >
        {deleteLoading ? 'Deleting...' : 'Delete'}
      </Button>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Project List</h1>
        <Link to="/projects/new">
          <Button variant="success">New Project</Button>
        </Link>
      </div>

      <LoadingWrapper isLoading={loading} error={error}>
        {projects && projects.length > 0 ? (
          <Table projects={projects} DeleteButton={ProjectDeleteButton} />
        ) : (
          <div className="mt-4 text-gray-500 text-center p-6 bg-gray-100 rounded-lg">
            No projects found. Click "New Project" to create one.
          </div>
        )}
      </LoadingWrapper>
    </div>
  );
};

const Table = ({ projects, DeleteButton }) => (
  <div className="overflow-x-auto shadow-md rounded-lg">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Start</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">End</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Progress</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Action</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {projects.map((project) => (
          <tr key={project.id} className="hover:bg-gray-50 border-b border-gray-200">
            <td className="py-3 px-4">{project.name}</td>
            <td className="py-3 px-4">{new Date(project.startDate).toLocaleDateString()}</td>
            <td className="py-3 px-4">{new Date(project.endDate).toLocaleDateString()}</td>
            <td className="py-3 px-4">
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${project.completionPercentage}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm">{project.completionPercentage?.toFixed(1)}%</span>
              </div>
            </td>
            <td className="py-3 px-4">
              {project.delayed ? (
                <span className="bg-red-500 text-white py-1 px-2 rounded">Delayed</span>
              ) : (
                <span className="bg-blue-500 text-white py-1 px-2 rounded">On Time</span>
              )}
            </td>
            <td className="py-3 px-4">
              <DeleteButton projectId={project.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProjectList;
