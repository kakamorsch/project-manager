import { createContext, useState, useEffect, useCallback } from 'react'
import { getProjects } from './Api'

const ProjectContext = createContext()

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refreshProjects = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateProjects = useCallback((newProjects) => {
    setProjects(newProjects)
  }, [])

  useEffect(() => {
    refreshProjects()
  }, [refreshProjects])

  return (
    <ProjectContext.Provider value={{ projects, loading, error, refreshProjects, updateProjects }}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContext
