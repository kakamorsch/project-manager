const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let projects = []; // Array para armazenar projetos
let activities = []; // Array para armazenar atividades

// Rota para adicionar um novo projeto
app.post('/projetos', (req, res) => {
  const { name, startDate, endDate } = req.body;
  const newProject = {
    id: projects.length + 1,
    name,
    startDate,
    endDate,
    activities: [],
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

// Rota para adicionar uma nova atividade
app.post('/atividades', (req, res) => {
  console.log('Dados recebidos:', req.body); // Log dos dados recebidos

  const { projectId, name, startDate, endDate, finalized } = req.body;

  // Verifica se o projeto existe
  const project = projects.find((p) => p.id === Number(projectId));
  if (!project) {
    return res.status(404).json({ message: 'Projeto não encontrado' });
  }

  // Cria a nova atividade
  const newActivity = {
    id: activities.length + 1,
    projectId,
    name,
    startDate,
    endDate,
    finalized,
  };

  // Adiciona a nova atividade ao array de atividades
  activities.push(newActivity);

  // Adiciona a nova atividade ao projeto correspondente
  project.activities.push(newActivity);

  console.log('Atividade criada:', newActivity); // Log da nova atividade
  res.status(201).json(newActivity); // Retorna a nova atividade criada
});

// Rota para listar projetos
app.get('/projetos', (req, res) => {
  res.json(projects);
});

// Inicia o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
