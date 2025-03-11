import { Link, Routes, Route } from 'react-router-dom'
import { ProjectProvider } from './ProjectContext'
import ProjectList from './components/ProjectList'
import ProjectForm from './components/ProjectForm'
import ActivityForm from './components/ActivityForm'

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Gerenciador de Projetos
        </Link>
        <div className="space-x-4">
          <Link to="/projetos/novo" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">
            Novo Projeto
          </Link>
          <Link to="/projetos" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">
            Ver Projetos
          </Link>
          <Link to="/atividades/novo" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">
            Nova Atividade
          </Link>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <ProjectProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/projetos" element={<ProjectList />} />
            <Route path="/projetos/novo" element={<ProjectForm />} />
            <Route path="/atividades/novo" element={<ActivityForm />} />
          </Routes>
        </div>
      </div>
    </ProjectProvider>
  )
}

export default App
