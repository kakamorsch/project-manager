import { Router } from 'express';
const router = Router();
import projectService from '../services/index.js';



// Route to create a new activity
router.post('/', (req, res) => {
  const { projectId, name, startDate, endDate, completed } = req.body;
  try {
    const activity = projectService.createActivity(projectId, name, startDate, endDate, completed);
    res.status(201).json(activity);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Route to update an existing activity
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { projectId, name, startDate, endDate, completed } = req.body;
  try {
    const activity = projectService.updateActivity(id, projectId, name, startDate, endDate, completed);
    res.status(200).json(activity);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
