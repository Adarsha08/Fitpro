'use client'

import { useState, useEffect, useCallback } from "react"
import {getAllSessionBook} from '@/lib/services/memberServices'
export const useSession = () => {
  const [sessionbook, setsessionBook] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchSessionBook = useCallback(async () => {
    try {
      const data=await getAllSessionBook()
      
      setsessionBook(data)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSessionBook()
  }, [fetchSessionBook])

  return {
    sessionbook,
    loading,
    error,
    refetch: () => fetchSessionBook,
  }
}