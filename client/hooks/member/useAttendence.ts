'use client'

import { useState, useEffect, useCallback } from "react"
import {getAttendence} from '@/lib/services/memberServices'
export const useAttendence = () => {
  const [attendence, setAttendence] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchAttendence = useCallback(async () => {
    try {
      const data=await getAttendence()
      console.log("sessions:", data)
      setAttendence(data)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAttendence()
  }, [fetchAttendence])

  return {
    attendence,
    loading,
    error,
    refetch:fetchAttendence,
  }
}