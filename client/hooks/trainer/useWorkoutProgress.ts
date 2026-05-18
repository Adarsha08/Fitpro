import { getWorkoutPlans, getWorkoutProgress } from "@/lib/services/trainerServices";
import { useCallback, useEffect, useState } from "react";
export const useWorkoutProgress = () => {
  const [progress, setProgress] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    try {
      const data = await getWorkoutProgress()
      setProgress(data)
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProgress()
  }, [fetchProgress])

  return { progress, loading, refetch: fetchProgress }
}
