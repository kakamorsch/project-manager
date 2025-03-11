import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjects, deleteProject } from '../Api'

export default function ProjectList() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await deleteProject(id)
        setProjects(projects.filter(project => project.id !== id))
      } catch (err) {
        setError(err.message)
      }
    }
  }

  if (loading) return <div className="p-4 text-gray-500">Carregando projetos...</div>
  if (error) return <div className="p-4 text-red-500">Erro: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Lista de Projetos</h1>
        <Link
          to="/projetos/novo"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Novo Projeto
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nome</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Início</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Término</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Progresso</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {projects.map(project => (
              <tr key={project.id} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="py-3 px-4">{project.name}</td>
                <td className="py-3 px-4">{new Date(project.startDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">{new Date(project.endDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${project.projectPercentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">{project.projectPercentage?.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/projetos/${project.id}/edit`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {projects.length === 0 && (
        <div className="mt-4 text-gray-500 text-center">
          Nenhum projeto cadastrado
        </div>
      )}
    </div>
  )
}
