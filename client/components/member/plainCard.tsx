"use client";
import { useAuth } from "@/context/AuthContext";

type Props = {
  memberPlans: any
}

export default function PlanCard({ memberPlans }: Props) {
  const auth = useAuth();

  const daysLeft = memberPlans?.endDate
    ? Math.ceil((new Date(memberPlans.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0

  const totalDays = memberPlans?.plan?.durationDays || 1
  const usedPercent = Math.round(((totalDays - daysLeft) / totalDays) * 100)

  return (
    <div className="text-black mb-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">
          Welcome, <span className="text-green-700">{auth?.user?.name}</span> 💦
        </h1>
        <p className="text-gray-400 text-sm mt-1">Track your plan, sessions, and attendance</p>
      </div>

      {memberPlans ? (
        <div className="bg-white border border-green-200 rounded-2xl p-6 flex justify-between items-center relative overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-green-50 to-transparent pointer-events-none" />
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-3">
              ● {memberPlans?.status}
            </span>
            <h2 className="text-xl font-bold">{memberPlans?.plan?.name}</h2>
            <p className="text-gray-400 text-sm mt-1">Rs {memberPlans?.plan?.price} · {memberPlans?.plan?.durationDays} days total</p>
            <div className="mt-4 w-72">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>{usedPercent}% used</span>
              </div>
              <div className="h-1.5 bg-green-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-700 rounded-full" style={{ width: `${usedPercent}%` }} />
              </div>
            </div>
          </div>
          <div className="text-right relative z-10">
            <p className="text-6xl font-extrabold text-green-700 leading-none">{daysLeft}</p>
            <p className="text-gray-400 text-sm mt-2">days remaining</p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400 text-sm">
          No active plan assigned
        </div>
      )}
    </div>
  );
}