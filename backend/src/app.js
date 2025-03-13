import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

import projectRoutes from './routes/projects';
import activityRoutes from './routes/activities';

app.use('/projects', projectRoutes);
app.use('/activities', activityRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
