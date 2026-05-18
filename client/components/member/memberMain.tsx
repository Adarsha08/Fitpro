"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { markAttendence, sessionBook, markWorkoutComplete } from "@/lib/services/memberServices";
import { toast } from "react-toastify";
import { useSession } from "@/hooks/member/useSession";
import { useAttendence } from "@/hooks/member/useAttendence";
import { useAssignedWorkouts } from "@/hooks/member/useAssignedWorkouts";

type Props = {
  trainers: any[];
};

export default function MemberMain({ trainers }: Props) {
  const [activeTab, setActiveTab] = useState<"trainers" | "sessions" | "attendance" | "workouts">("trainers");
  const [bookModal, setBookModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [date, setDate] = useState("");

  const { sessionbook, refetch: sessionRefetch } = useSession();
  const { attendence, refetch: attendenceRefetch } = useAttendence();
  const { assignedWorkouts, refetch: workoutRefetch } = useAssignedWorkouts();

  const handleBookSession = (trainer: any) => {
    setSelectedTrainer(trainer);
    setDate("");
    setBookModal(true);
  };

  const handleSubmitBook = async () => {
    try {
      await sessionBook({ trainerId: selectedTrainer.id, date });
      toast.success("Session booked successfully!");
      sessionRefetch();
      setBookModal(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to book session");
    }
  };

  const markedAttendence = async () => {
    try {
      await markAttendence();
      toast.success("Attendance marked");
      attendenceRefetch();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error marking attendance");
    }
  };

  const handleMarkComplete = async (workoutId: string) => {
    try {
      await markWorkoutComplete(workoutId);
      toast.success("Workout marked as complete!");
      workoutRefetch();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to mark complete");
    }
  };

  const present = attendence.length;
  const absent = 0;
  const rate = attendence.length > 0 ? 100 : 0;

  return (
    <div className="bg-gray-50 pb-10">
      <div className="flex gap-4 border-b border-gray-200 mb-6 bg-gray-50">
        {["trainers", "sessions", "attendance", "workouts"].map((tab) => (
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

      {activeTab === "trainers" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainers.length === 0 ? (
            <p className="text-sm text-gray-400 col-span-3 text-center py-10">No trainers available</p>
          ) : (
            trainers.map((trainer) => (
              <div key={trainer.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center font-bold text-gray-700 mb-3">
                  {trainer.name[0]}
                </div>
                <p className="font-semibold text-gray-800">{trainer.name}</p>
                <p className="text-sm text-gray-400 mb-4">{trainer.email}</p>
                <button
                  onClick={() => handleBookSession(trainer)}
                  className="w-full py-2 bg-gray-900 text-white text-sm rounded-lg hover:opacity-90 transition cursor-pointer"
                >
                  Book Session
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "sessions" && (
        <div className="flex flex-col gap-3">
          {sessionbook.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">No sessions yet</p>
          ) : (
            sessionbook.map((session: any) => (
              <div key={session.id} className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{session.trainer.name}</p>
                  <p className="text-sm text-gray-400">{session.trainer.email}</p>
                  <p className="text-sm text-gray-400">{new Date(session.date).toLocaleString()}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-50 text-green-600 border border-green-200">
                  {session.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <button
              onClick={markedAttendence}
              className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:opacity-90 transition cursor-pointer"
            >
              + Mark Attendance
            </button>
          </div>
          {attendence.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">No attendance records</p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">{present}</div>
                  <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Present</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-500">{absent}</div>
                  <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Absent</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-400">{rate}%</div>
                  <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Rate</div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {attendence.map((record: any, index: number) => (
                  <div
                    key={record.id}
                    className={`flex items-center justify-between px-4 py-3 ${
                      index !== attendence.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {new Date(record.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(record.date).toLocaleDateString("en-US", { weekday: "long" })}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full border bg-green-50 text-green-600 border-green-200">
                      PRESENT
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "workouts" && (
        <div className="flex flex-col gap-4">
          {assignedWorkouts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">No workout plans assigned yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedWorkouts.map((workout: any) => (
                <div key={workout.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-xl mb-3">
                    💪
                  </div>
                  <p className="font-semibold text-gray-800">{workout.plan?.name}</p>
                  <p className="text-sm text-gray-400 mt-1 mb-4">{workout.plan?.description || "No description"}</p>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                    workout.status === "COMPLETED"
                      ? "bg-green-50 text-green-600 border-green-200"
                      : "bg-yellow-50 text-yellow-600 border-yellow-200"
                  }`}>
                    {workout.status || "PENDING"}
                  </span>
                  {workout.status !== "COMPLETED" && (
                    <button
                      onClick={() => handleMarkComplete(workout.id)}
                      className="mt-3 w-full py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-900 hover:text-white transition cursor-pointer"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal
        open={bookModal}
        onClose={() => setBookModal(false)}
        title={`Book Session with ${selectedTrainer?.name}`}
        onCancel={() => setBookModal(false)}
        onSave={handleSubmitBook}
        saveLabel="Book"
      >
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-gray-600">Select Date & Time</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-200 p-2.5 rounded-lg text-black outline-none focus:border-blue-500 text-sm"
          />
        </div>
      </Modal>
    </div>
  );
}