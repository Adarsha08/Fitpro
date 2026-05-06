"use client";
import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { usePlans } from "@/hooks/usePlans";

type Props = {
  onAdd: (type: "TRAINER" | "MEMBER" | "PLAN") => void;
  plans: any[];
};

export default function AdminMain({ onAdd, plans }: Props) {
  const [activeTab, setActiveTab] = useState<
    "trainers" | "members" | "plans"
  >("trainers"); {
  const [activeTab, setActiveTab] = useState<"trainers" | "members" | "plans">(
    "trainers",
  );
  const { users: trainers, refetch: refetchTrainers } = useUsers("TRAINER");
  const { users: members, refetch: refetchMembers } = useUsers("MEMBER");
 
  console.log("trainers:", trainers);
  console.log("members:", members);
  console.log("plans:", plans);

  return (
    <div className="min-h-96 p-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        {["trainers", "members", "plans"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-2 text-sm capitalize ${activeTab === tab ? "border-b-2 border-gray-900 font-medium text-gray-900" : "text-gray-400"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "trainers" && (
        <div>
          <div className="flex justify-end ">
            <button
              onClick={()=>onAdd("TRAINER")}
              className="bg-blue-500 p-1 cursor-pointer hover:bg-blue-600  text-white w-34 rounded-lg m-3"
            >
              +Add Trainer
            </button>
          </div>
          {trainers.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
              No trainer added
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trainers.map((trainer: any) => (
                <div
                  key={trainer.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{trainer.name}</p>
                    <p className="text-sm text-gray-400">{trainer.email}</p>
                  </div>
                  <button className="text-xs text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 transition">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "members" && (
        <div>
          <div className="flex justify-end ">
            <button
              onClick={()=>onAdd("MEMBER")}
              className="bg-blue-500 p-1 cursor-pointer hover:bg-blue-600  text-white w-34 rounded-lg m-3"
            >
              +Add Trainer
            </button>
          </div>
          {members.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
              No member added
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member: any) => (
                <div
                  key={member.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.email}</p>
                  </div>
                  <button className="text-xs text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 transition">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "plans" && (
        <div>
          <div className="flex justify-end ">
            <button
              onClick={()=>onAdd("PLAN")}
              className="bg-blue-500 p-1 cursor-pointer hover:bg-blue-600  text-white w-34 rounded-lg m-3"
            >
              +Add Trainer
            </button>
          </div>
          {plans.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
              No plans added
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {plans.map((plan: any) => (
                <div
                  key={plan.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{plan.name}</p>
                    <p className="text-sm text-gray-400">
                      ${plan.price} · {plan.durationDays} days
                    </p>
                  </div>

                  <button className="text-xs text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 transition">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
}
