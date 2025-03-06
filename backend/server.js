import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Permite requisições de outros domínios
app.use(express.json()); // Para analisar o corpo das requisições JSON

// Simulação de um banco de dados em memória
let projects = [];
let activities = [];

// Rota para listar projetos com atividades
app.get('/projetos', (req, res) => {
  const projectsWithActivities = projects.map((project) => {
    // Filtra as atividades que pertencem ao projeto atual
    const projectActivities = activities.filter(activity => activity.projectId === project.id);

    // Cálculo da porcentagem de conclusão
    const totalActivities = projectActivities.length;
    const completedActivities = projectActivities.filter(activity => activity.finalized).length;
    const completionPercentage = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;

    // Verificação de atraso
    const maxActivityEndDate = projectActivities.reduce((latest, activity) => {
      return new Date(activity.endDate) > latest ? new Date(activity.endDate) : latest;
    }, new Date(0)); // Data mínima
    const isDelayed = maxActivityEndDate > new Date(project.endDate);

    return {
      ...project,
      activities: projectActivities,
      completionPercentage: completionPercentage.toFixed(2) + '%',
      isDelayed: isDelayed ? 'Sim' : 'Não',
    };
  });

  res.json(projectsWithActivities);
});
// Rota para cadastrar projetos
app.post('/projetos', (req, res) => {
  const { name, description } = req.body;
  const newProject = { id: projects.length + 1, name, description };
  projects.push(newProject);
  res.status(201).json(newProject);
});

// Rota para cadastrar atividades
app.post('/atividades', (req, res) => {
  const { projectId, name, startDate, endDate, finalized } = req.body;
  const newActivity = { id: activities.length + 1, projectId, name, startDate, endDate, finalized };
  activities.push(newActivity);
  res.status(201).json(newActivity);
});
// Rota para cadastrar atividades
app.post('/atividades', (req, res) => {
  const { projectId, name, startDate, endDate, finalized } = req.body;

  // Verifica se o projeto existe
  const projectExists = projects.some(project => project.id === projectId);
  if (!projectExists) {
    return res.status(400).json({ error: 'Projeto não encontrado' });
  }

  const newActivity = {
    id: activities.length + 1, // Gera um novo ID para a atividade
    projectId,
    name,
    startDate,
    endDate,
    finalized,
  };

  activities.push(newActivity); // Adiciona a nova atividade ao array de atividades
  res.status(201).json(newActivity); // Retorna a nova atividade criada
});
// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
