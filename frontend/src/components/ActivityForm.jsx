import React, { useState, useEffect, useContext } from 'react';
import { useGetProjects, useCreateActivity } from '../Api';
import { useNavigate, Link } from 'react-router-dom';
import ProjectContext from '../ProjectContext';
import Button from './ui/Button';
import FormField from './ui/FormField';
import DateInput from './ui/DateInput';
import ErrorMessage from './ui/ErrorMessage';

function ActivityForm() {
  const [formData, setFormData] = useState({
    projectId: '',
    name: '',
    startDate: '',
    endDate: '',
    finalized: false,
  });

  const navigate = useNavigate();
  const { refreshProjects } = useContext(ProjectContext);
  const { projects, error, loading } = useGetProjects();
  const { createActivity, error: createError, loading: createLoading } = useCreateActivity();

  useEffect(() => {
    if (error) console.error('Error loading projects:', error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createActivity(formData);
      await refreshProjects();
      navigate(`/projects/${formData.projectId}`);
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">New Activity</h1>

      <FormField label="Project" error={error}>
        <select
          required
          value={formData.projectId}
          onChange={(e) => setFormData({ ...formData, projectId: Number(e.target.value) })}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a project</option>
          {projects?.map((project) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Activity Name" error={createError}>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <DateInput
          label="Start Date"
          value={formData.startDate}
          onChange={(value) => setFormData({ ...formData, startDate: value })}
          required
        />

        <DateInput
          label="End Date"
          value={formData.endDate}
          onChange={(value) => setFormData({ ...formData, endDate: value })}
          required
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={formData.finalized}
          onChange={(e) => setFormData({ ...formData, finalized: e.target.checked })}
          className="mr-2"
        />
        <label className="text-gray-700">Finalized</label>
      </div>

      <ErrorMessage error={createError} className="mb-4" />

      <div className="flex justify-between">
        <Button
          variant="primary"
          onClick={handleSubmit}
          loading={createLoading}
        >
          Save Activity
        </Button>
        <Link to="/projects">
          <Button variant="secondary">Cancel</Button>
        </Link>
      </div>
    </div>
  );
}

export default ActivityForm;
