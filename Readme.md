Para executar o código, por favor, siga as instruções abaixo:

# Project Manager

Project Manager é uma aplicação full-stack para gerenciar projetos e suas atividades. Consiste em um frontend React e um backend Node.js.

## Estrutura do Repositório

O repositório está organizado em dois diretórios principais:
- `frontend/` - Aplicação React
- `backend/` - API Node.js

## Pré-requisitos

Antes de executar a aplicação, certifique-se de ter:

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [Bun](https://bun.sh/) - Runtime JavaScript e gerenciador de pacotes rápido

## Instalação

### Backend

1. Navegue até o diretório backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
bun install
```

### Frontend

1. Navegue até o diretório frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
bun install
```

## Executando a Aplicação

### Backend

1. Inicie o servidor backend:
```bash
cd backend
bun dev
```

A API backend estará disponível em `http://localhost:3000` por padrão.

### Frontend

1. Inicie o servidor de desenvolvimento frontend:
```bash
cd frontend
bun dev
```

A aplicação frontend estará disponível em `http://localhost:5173` por padrão.

## Testes

### Testes do Backend

O backend utiliza Vitest para testes. Execute os testes com:

```bash
cd backend
bun test
```

Isso executará testes para:
- Modelos de projeto
- Modelos de atividade
- Serviços de projeto
- Utilitários de análise de projeto

### Frontend

Você pode testar manualmente o frontend navegando até `http://localhost:5173` e usando a interface de usuário para:

1. Criar, visualizar, atualizar atividades de projetos
2. Adicionar atividades aos projetos
3. Acompanhar o progresso do projeto
4. Visualizar análises de projeto

## Endpoints da API

O backend fornece os seguintes endpoints principais:

- `GET /api/projects` - Obter todos os projetos
- `POST /api/projects` - Criar um novo projeto
- `POST /api/projects/:id/activities` - Adicionar uma atividade a um projeto
- `PUT /api/projects/activities/:id` - Atualiza uma atividade de um projeto

## Estrutura do Projeto

### Estrutura do Backend

- `src/app.js` - Ponto de entrada principal da aplicação
- `src/models/` - Modelos de dados (projeto, atividade)
- `src/routes/` - Definições de rotas da API
- `src/services/` - Serviços de lógica de negócios
- `src/utils/` - Funções utilitárias para análises

### Estrutura do Frontend

- `src/App.jsx` - Componente principal da aplicação
- `src/components/` - Componentes da UI
- `src/contexts/` - Context React para gerenciamento de estado
- `src/services/` - Serviço de API para comunicação com o backend

## Tecnologias Utilizadas

- **Backend**: Node.js, Express
- **Frontend**: React, TailwindCSS
- **Testes**: Vitest
- **Gerenciador de Pacotes**: Bun

