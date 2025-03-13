import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getActivities, deleteActivity } from '../Api'

export default function ActivityList() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await getActivities()
        setActivities(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadActivities()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta atividade?')) {
      try {
        await deleteActivity(id)
        setActivities(activities.filter(activity => activity.id !== id))
      } catch (err) {
        setError(err.message)
      }
    }
  }

  if (loading) return <div className="p-4 text-gray-500">Carregando atividades...</div>
  if (error) return <div className="p-4 text-red-500">Erro: {error}</div>

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Lista de Atividades</h1>
        <Link
          to="/activities/new"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Nova Atividade
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nome</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Projeto</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Início</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Término</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {activities.map(activity => (
              <tr key={activity.id} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="py-3 px-4">{activity.name}</td>
                <td className="py-3 px-4">Projeto #{activity.projectId}</td>
                <td className="py-3 px-4">{new Date(activity.startDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">{new Date(activity.endDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${activity.finalized ?
                    'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {activity.finalized ? 'Concluída' : 'Em andamento'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/activities/${activity.id}/edit`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(activity.id)}
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

      {activities.length === 0 && (
        <div className="mt-4 text-gray-500 text-center">
          Nenhuma atividade cadastrada
        </div>
      )}
    </div>
  )
}
