"use client";

import MemberMain from "@/components/member/memberMain";
import PlainCard from "@/components/member/plainCard";
import { useMemberPlan } from "@/hooks/member/useMemberPlan";
import {useTrainer} from '@/hooks/member/useTrainers'
export default function Member() {
  const { memberPlan, refetch: fetcheMemberPlan } = useMemberPlan();
  const{trainers,loading,error,refetch}=useTrainer()
  
  return (
    <div>
      <PlainCard memberPlans={memberPlan} />
      <MemberMain 
        trainers={trainers}
      />
    </div>
  );
}
