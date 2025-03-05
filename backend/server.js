import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Rotas básicas
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
