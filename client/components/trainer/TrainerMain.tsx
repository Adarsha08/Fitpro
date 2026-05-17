"use client";

import { WorkoutPlans } from "@/hooks/trainer/useWorkoutPlan";
import { useState } from "react";
import { any } from "zod";
import Modal from "../ui/Modal";

type Props = {
  workoutPlans: any[];
};
export default function TrainerMain({ workoutPlans }: Props) {
  const [activeTab, setActiveTab] = useState<
    "workoutplans" | "sessions" | "availability"
  >("workoutplans");

  const [openWorkout, setopenWorkout] = useState(false);

  const createplan = () => {
    setopenWorkout(true); // ← add this
  };

  return (
    <div className=" bg-gray-50 mt-8 pb-10">
      {/* TABS */}
      <div className="flex gap-4 border-b border-gray-200 mb-6 bg-gray-50">
        {["workoutplans", "sessions", "availability"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-2 text-sm cursor-pointer capitalize ${
              activeTab === tab
                ? "border-b-2 border-gray-900 font-medium text-gray-900"
                : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "workoutplans" && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              My Workout Plans
            </p>
            <button
              onClick={createplan}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg cursor-pointer transition"
            >
              + Create Plan
            </button>
          </div>

          {workoutPlans.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
              No workout plans yet
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {workoutPlans.map((plan: any) => (
                <div
                  key={plan.id}
                  className="bg-white border border-gray-200 rounded-xl p-5"
                >
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-xl mb-3">
                    💪
                  </div>
                  <p className="font-semibold text-gray-800">{plan.name}</p>
                  <p className="text-sm text-gray-400 mt-1 mb-4">
                    {plan.description || "No description"}
                  </p>
                  <button className="w-full py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-900 hover:text-white transition cursor-pointer">
                    Assign to Member
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Modal
        open={openWorkout}
        onClose={() => setopenWorkout(false)}
        title={"Create workout plan"}
        onCancel={() => setopenWorkout(false)}
        onSave={createplan}
        saveLabel="Create"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Title</label>
            <input
              className="border border-gray-200 text-black p-2.5 rounded-lg outline-none focus:border-blue-500 text-sm"
              placeholder="e.g. Full Body Strength"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">
              Description
            </label>
            <input
              className="border border-gray-200 text-black p-2.5 rounded-lg outline-none focus:border-blue-500 text-sm"
              placeholder="e.g. A 45 min full body workout"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
