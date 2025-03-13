import Project from '../models/project';
import Activity from '../models/activity';

class ProjectService {
  constructor() {
    this.projects = [];
    this.activities = [];
  }

  createProject(name, startDate, endDate) {
    const project = new Project(this.projects.length + 1, name, startDate, endDate);
    this.projects.push(project);
    return project;
  }

  createActivity(projectId, name, startDate, endDate, completed) {
    console.log('projectId:', projectId);
    console.log('projects:', this.projects);
    const project = this.projects.find(p => {
      console.log('p.id:', p.id);
      return p.id === Number(projectId);
    });
    if (!project) {
      console.log('Project not found');
      throw new Error('Project not found');
    }
    const activity = new Activity(
      this.activities.length + 1,
      projectId,
      name,
      startDate,
      endDate,
      completed
    );
    this.activities.push(activity);
    project.addActivity(activity);
    return activity;
  }

  updateActivity(id, projectId, name, startDate, endDate, completed) {
    const activityIndex = this.activities.findIndex(a => a.id === Number(id));
    if (activityIndex === -1) {
      throw new Error('Activity not found');
    }

    // Update activity properties
    const existingActivity = this.activities[activityIndex];
    existingActivity.projectId = projectId;
    existingActivity.name = name;
    existingActivity.startDate = startDate;
    existingActivity.endDate = endDate;
    existingActivity.completed = completed;

    // Update the corresponding project
    const project = this.projects.find(p => p.id === Number(projectId));
    if (project) {
      project.updateCompletionPercentage();
    }
    return existingActivity;
  }

  getProjects() {
    return this.projects;
  }
}

export default ProjectService;
