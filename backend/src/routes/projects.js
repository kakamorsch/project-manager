import { Router } from 'express';
import projectService from '../services/index.js';
const router = Router();

router.post('/', (req, res) => {
	const { name, startDate, endDate } = req.body;
	const project = projectService.createProject(name, startDate, endDate);
	res.status(201).json(project);
});

router.get('/', (req, res) => {
	const projects = projectService.getProjects();
	const projectsWithAnalytics = projects.map((project) => ({
		...project,
		delayed: project.delayed,
	}));
	res.json(projectsWithAnalytics);
});

export default router;
