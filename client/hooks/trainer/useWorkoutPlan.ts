import { getWorkoutPlans } from "@/lib/services/trainerServices";
import { useCallback, useEffect, useState } from "react";
export const WorkoutPlans = () => {
  const [workoutPlans, setworkoutPlans] = useState(<any[]>[]);
  const [loading, setLoading] = useState(false);
  const fetchWorkoutPlan = useCallback(async () => {
    try {
      const data = await getWorkoutPlans();
      setworkoutPlans(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkoutPlan();
  }, []);

  return {
    workoutPlans,
    loading,
    refetch: fetchWorkoutPlan,
  };
};
