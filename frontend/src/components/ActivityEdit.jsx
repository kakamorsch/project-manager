import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getActivity, updateActivity, getProjects } from '../Api'

export default function ActivityEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activity, setActivity] = useState({})
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [activityData, projectsData] = await Promise.all([
          getActivity(id),
          getProjects()
        ])
        setActivity(activityData)
        setProjects(projectsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateActivity(id, activity)
      navigate('/atividades')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="p-4 text-gray-500">Carregando...</div>
  if (error) return <div className="p-4 text-red-500">Erro: {error}</div>

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Editar Atividade</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Projeto
          </label>
          <select
            value={activity.projectId}
            onChange={(e) => setActivity({...activity, projectId: Number(e.target.value)})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione um projeto</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nome da Atividade
          </label>
          <input
            type="text"
            value={activity.name || ''}
            onChange={(e) => setActivity({...activity, name: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Data de Início
            </label>
            <input
              type="date"
              value={activity.startDate?.split('T')[0] || ''}
              onChange={(e) => setActivity({...activity, startDate: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Data de Término
            </label>
            <input
              type="date"
              value={activity.endDate?.split('T')[0] || ''}
              onChange={(e) => setActivity({...activity, endDate: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            checked={activity.finalized || false}
            onChange={(e) => setActivity({...activity, finalized: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-gray-700 text-sm">
            Finalizada
          </label>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          >
            Salvar Alterações
          </button>
          <button
            type="button"
            onClick={() => navigate('/atividades')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
