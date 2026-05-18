'use client'
import { useState, useEffect, useCallback } from "react"
import { getAssignedWorkouts } from '@/lib/services/memberServices'

export const useAssignedWorkouts = () => {
  const [assignedWorkouts, setAssignedWorkouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchWorkouts = useCallback(async () => {
    try {
      const data = await getAssignedWorkouts()
      setAssignedWorkouts(data)
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWorkouts()
  }, [fetchWorkouts])

  return { assignedWorkouts, loading, refetch: fetchWorkouts }
}