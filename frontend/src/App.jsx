import React from 'react';
import ProjectForm from './components/ProjectForm';
import ActivityForm from './components/ActivityForm';

function App() {
  const projectId = 1; // Exemplo de ID do projeto, você pode gerenciá-lo dinamicamente

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Projetos</h1>
      <ProjectForm />
      <ActivityForm projectId={projectId} />
    </div>
  );
}

export default App;
