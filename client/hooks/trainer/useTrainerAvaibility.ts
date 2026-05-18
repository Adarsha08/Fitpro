'use client'
import { useState, useEffect, useCallback } from "react"
import { getTrainerAvaibility } from "@/lib/services/trainerServices"
export const useTrainerAvaibility = () => {
  const [allavaibility, setallavaibility] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchTrainerAvaibility = useCallback(async () => {
    try {
      const data=await getTrainerAvaibility()
      console.log("availability:", data)
      
      setallavaibility(data)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTrainerAvaibility()
  }, [fetchTrainerAvaibility])

  return {
    allavaibility,
    loading,
    error,
    refetch:fetchTrainerAvaibility,
  }
}