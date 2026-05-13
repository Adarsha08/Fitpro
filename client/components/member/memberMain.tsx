"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { sessionBook } from "@/lib/services/memberServices";
import { toast } from "react-toastify";
import { useSession } from "@/hooks/member/useSession";

type Props = {
  trainers: any[];
};

export default function MemberMain({ trainers }: Props) {
  const [activeTab, setActiveTab] = useState<
    "trainers" | "sessions" | "attendance"
  >("trainers");
  const [bookModal, setBookModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [date, setDate] = useState("");
  const { sessionbook, loading, error, refetch } = useSession();

  const handleBookSession = (trainer: any) => {
    setSelectedTrainer(trainer);
    setDate("");
    setBookModal(true);
  };

  const handleSubmitBook = async () => {
    try {
      await sessionBook({ trainerId: selectedTrainer.id, date });
      toast.success("Session booked successfully!");
      setBookModal(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to book session");
    }
  };

  return (
    <div className="text-black ">
      <div className="flex gap-4 border-b mb-6">
        {["trainers", "sessions", "attendance"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-2 text-sm cursor-pointer capitalize ${activeTab === tab ? "border-b-2 border-gray-900 font-medium text-gray-900" : "text-gray-400"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "trainers" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainers.length === 0 ? (
            <p className="text-sm text-gray-400 col-span-3 text-center py-10">
              No trainers available
            </p>
          ) : (
            trainers.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-white border border-gray-200 rounded-xl p-4"
              >
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
            <p className="text-sm text-gray-400 text-center py-10">
              No sessions yet
            </p>
          ) : (
            sessionbook.map((session: any) => (
              <div
                key={session.id}
                className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {session.trainer.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {session.trainer.email}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(session.date).toLocaleString()}
                  </p>
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
        <div>
          <p className="text-sm text-gray-400 text-center py-10">
            No attendance records
          </p>
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
          <label className="text-xs font-medium text-gray-600">
            Select Date & Time
          </label>
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
