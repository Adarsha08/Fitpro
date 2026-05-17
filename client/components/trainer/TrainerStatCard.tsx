"use client";

type Props = {
  workoutCount: number
  sessionStatusCount: number
  trainerAvaibilityCount: number
}

export default function TrainerStatCard({ workoutCount, sessionStatusCount, trainerAvaibilityCount }: Props) {
  const cards = [
    { title: "Workout Plans", value: workoutCount, color: "text-blue-600" },
    { title: "Active Sessions", value: sessionStatusCount, color: "text-green-600" },
    { title: "Available Slots", value: trainerAvaibilityCount, color: "text-orange-500" },
  ]

  return (
    <div className="text-black mb-6">
      <h1 className="text-2xl font-bold">Trainer Dashboard</h1>
      <p className="text-gray-400 text-sm mt-1">Manage your workout plans, sessions, and availability.</p>

      <div className="grid grid-cols-3 gap-5 mt-5">
        {cards.map((card, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{card.title}</p>
            <p className={`text-3xl font-extrabold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}