'use client'

import { useState, useEffect, useCallback } from "react"
import { getAllUser } from "@/lib/services/adminServices"

export const useUsers = (role: string | null) => {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchUsers = useCallback(async (currentRole: string | null) => {
    try {
      setLoading(true)

      if (!currentRole) {
        setUsers([])
        return
      }

      const data = await getAllUser(currentRole)
      setUsers(data)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers(role)
  }, [role, fetchUsers])

  return {
    users,
    loading,
    error,
    refetch: () => fetchUsers(role),
  }
}