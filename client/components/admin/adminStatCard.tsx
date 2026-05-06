"use client";
type Props = {
  plans: any[]   // or better: Plan[]
}
import { useUsers } from "@/hooks/useUsers";
export default function AdminStatCard({plans}:Props) {
  const { users: trainers, refetch: refetchTrainers } = useUsers("TRAINER");
  const { users: members, refetch: refetchMembers } = useUsers("MEMBER");
 

  return (
    <div >
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Trainers</p>
          <p className="text-2xl font-semibold text-gray-900">
            {trainers.length}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Members</p>
          <p className="text-2xl font-semibold text-gray-900">
            {members.length}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Active Plans</p>
          <p className="text-2xl font-semibold text-gray-900">{plans.length}</p>
        </div>
      </div>
    </div>
  );
}
