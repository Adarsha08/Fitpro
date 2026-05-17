'use client'

import { useState, useEffect, useCallback } from "react"
import {getWorkoutPlans} from '@/lib/services/trainerServices'
export const useTrainerSession = () => {
  const [sessionStatus, setsessionStatus] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchSessionStatus = useCallback(async () => {
    try {
      const data=await getWorkoutPlans()
      setsessionStatus(data)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSessionStatus()
  }, [fetchSessionStatus])

  return {
    sessionStatus,
    loading,
    error,
    refetch:fetchSessionStatus,
  }
}