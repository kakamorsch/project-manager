import React from 'react';
import { ProjectProvider } from './ProjectContext';
import ProjectForm from './components/ProjectForm';
import ActivityForm from './components/ActivityForm';
import ProjectList from './components/ProjectList'; // Importa o novo componente

function App() {
  return (
    <ProjectProvider>
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Ger enciador de Projetos</h1>
        <ProjectForm />
        <ActivityForm />
        <ProjectList />
      </div>
    </ProjectProvider>
  );
}

export default App;
