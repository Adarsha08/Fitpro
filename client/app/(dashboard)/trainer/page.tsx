'use client'

import TrainerMain from "@/components/trainer/TrainerMain"
import TrainerStatCard from "@/components/trainer/TrainerStatCard"
import { useTrainerAvaibility } from "@/hooks/trainer/useTrainerAvaibility";
import { useTrainerSession } from "@/hooks/trainer/useTrainerSession";
import { WorkoutPlans } from "@/hooks/trainer/useWorkoutPlan";

export default function Trainer(){
    const { workoutPlans, loading, refetch: workoutRefetch } = WorkoutPlans();
    const{sessionStatus,loading:trainerSessionLoading,refetch:trainerSesssionRefetch}=useTrainerSession()
    const {allavaibility,loading:trainerAvaibilityLoadin,refetch:trainerAvaibilityRefetch}=useTrainerAvaibility()
    return(
        <div>
        <TrainerStatCard
        workoutCount={workoutPlans?.length}
        sessionStatusCount={sessionStatus?.length}
        trainerAvaibilityCount={allavaibility?.length}
        />
        <TrainerMain
        workoutPlans={workoutPlans}
        refetched={workoutRefetch}
        />
        </div>
        
    )
}