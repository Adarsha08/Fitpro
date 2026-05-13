'use client'

import { useState, useEffect, useCallback } from "react"
import{getAllTrainers} from '@/lib/services/memberServices'


export const useTrainer = () => {
  const [trainers, setTrainers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchTrainers = useCallback(async () => {
    try {
      const data=await getAllTrainers()
      setTrainers(data)
      
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTrainers()
  }, [fetchTrainers])

  return {
    trainers,
    loading,
    error,
    refetch: () => fetchTrainers,
  }
}