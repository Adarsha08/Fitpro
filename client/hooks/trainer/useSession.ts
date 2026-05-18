import { getSession, getWorkoutPlans, getWorkoutProgress } from "@/lib/services/trainerServices";
import { useCallback, useEffect, useState } from "react";
export const getTrainerSession = () => {
  const [session, setSession] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSession = useCallback(async () => {
    try {
      const data = await getSession()
      setSession(data)
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSession()
  }, [fetchSession])

  return { session, loading, refetch: fetchSession }
}
