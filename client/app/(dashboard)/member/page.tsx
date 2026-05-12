"use client";

import PlainCard from "@/components/member/plainCard";
import {useMemberPlan} from '@/hooks/useMemberPlan'
export default function Member() {
  const {memberPlan,loading,refetch:fetcheMemberPlan}=useMemberPlan()
  return (
    <div>

      <PlainCard memberPlans={memberPlan}/>
      
    </div>
  );
}
