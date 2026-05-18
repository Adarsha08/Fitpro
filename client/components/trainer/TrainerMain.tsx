"use client";

import { useState } from "react";
import Modal from "../ui/Modal";
import { toast } from "react-toastify";
import {
  Plus,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Dumbbell,
  Users,
  TrendingUp,
  Mail,
  UserPlus
} from "lucide-react";
import {
  createWorkoutPlans,
  getTrainerMembers,
  assignWorkoutPlan,
  addAvailability,
  updateSessionStatus,
} from "@/lib/services/trainerServices";
import { useWorkoutProgress } from "@/hooks/trainer/useWorkoutProgress";
import { getTrainerSession } from "@/hooks/trainer/useSession";
import { useTrainerAvaibility } from "@/hooks/trainer/useTrainerAvaibility";

type Props = {
  workoutPlans: any[];
  refetched: () => void;
};

type TabType = "workoutplans" | "sessions" | "availability" | "progress";

export default function TrainerMain({ workoutPlans, refetched }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("workoutplans");
  const [openWorkout, setopenWorkout] = useState(false);
  const [getmembers, setgetMember] = useState<any[]>([]);
  const [openAssignMember, setopenassignMember] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [form, setform] = useState({ title: "", description: "" });
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [openSessionModal, setOpenSessionModal] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);
  const [availabilityDate, setAvailabilityDate] = useState("");

  const { session = [], refetch: sessionRefetch } = getTrainerSession();
  const { progress = [], refetch: progressRefetch } = useWorkoutProgress();
  const { allavaibility = [], refetch: traineravaibilityRefetch } = useTrainerAvaibility();

  const handleinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const createplan = () => {
    setform({ title: "", description: "" });
    setopenWorkout(true);
  };

  const submitPlans = async () => {
    try {
      await createWorkoutPlans({ title: form.title, description: form.description });
      refetched();
      setopenWorkout(false);
      toast.success("Created workout plan");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create plan");
    }
  };

  const openAssignModal = async (planId: string) => {
    setSelectedPlanId(planId);
    setopenassignMember(true);
    const data = await getTrainerMembers();
    setgetMember(data.members || []);
  };

  const handleAssignWorkout = async (memberId: string) => {
    try {
      await assignWorkoutPlan({ memberId, planId: selectedPlanId });
      setopenassignMember(false);
      progressRefetch();
      toast.success("Workout plan assigned!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to assign");
    }
  };

  const handleAddAvailability = async () => {
    try {
      await addAvailability({ date: availabilityDate });
      setOpenAvailability(false);
      setAvailabilityDate("");
      traineravaibilityRefetch();
      toast.success("Availability slot added!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add slot");
    }
  };

  const handleUpdateStatus = async (sessionId: string, status: string) => {
    try {
      await updateSessionStatus(sessionId, status);
      sessionRefetch();
      setOpenSessionModal(false);
      toast.success(`Session marked as ${status}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update status");
    }
  };

  const tabsConfig = [
    { id: "workoutplans", label: "Workout Plans", icon: Dumbbell },
    { id: "sessions", label: "Booked Sessions", icon: Calendar },
    { id: "availability", label: "My Availability", icon: Clock },
    { id: "progress", label: "Member Progress", icon: TrendingUp },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-16 antialiased text-slate-900">
      {/* TABS NAVIGATION */}
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto scrollbar-none">
        <div className="flex space-x-8 min-w-max">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 pb-4 text-sm font-medium border-b-2 cursor-pointer transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* WORKOUT PLANS PANEL */}
      {activeTab === "workoutplans" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Workout Blueprints</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage and assign target training tracks.</p>
            </div>
            <button 
              onClick={createplan} 
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-150 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Create Plan
            </button>
          </div>

          {workoutPlans.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center shadow-sm">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-700">No workout plans yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Create customized routines to jumpstart your training schedule.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workoutPlans.map((plan: any) => (
                <div key={plan.id} className="group bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div>
                    <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center font-bold text-blue-600 text-sm mb-4 group-hover:scale-105 transition-transform duration-200">
                      {plan.name?.[0]?.toUpperCase() || "W"}
                    </div>
                    <h3 className="font-semibold text-slate-800 text-base">{plan.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 mb-6 leading-relaxed line-clamp-3">
                      {plan.description || "No description provided."}
                    </p>
                  </div>
                  <button 
                    onClick={() => openAssignModal(plan.id)} 
                    className="w-full text-slate-700 bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-200 hover:border-slate-900 py-2.5 text-sm font-semibold rounded-xl transition-all duration-150 cursor-pointer"
                  >
                    Assign to Member
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SESSIONS PANEL */}
      {activeTab === "sessions" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Roster Schedule</h2>
            <p className="text-xs text-slate-500 mt-0.5">Track and authorize client training reservations.</p>
          </div>

          {session.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center shadow-sm">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-700">All clear today</p>
              <p className="text-xs text-slate-400 mt-1">Booked sessions will populate right here.</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-sm">
              {session.map((sess: any) => (
                <div key={sess.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition duration-150">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm shadow-inner">
                      {sess.member?.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{sess.member?.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {new Date(sess.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-0 pt-3 sm:pt-0">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
                      sess.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      sess.status === "CANCELLED" ? "bg-rose-50 text-rose-600 border-rose-200" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        sess.status === "COMPLETED" ? "bg-emerald-500" :
                        sess.status === "CANCELLED" ? "bg-rose-500" : "bg-blue-500"
                      }`} />
                      {sess.status}
                    </span>
                    {sess.status === "BOOKED" && (
                      <button
                        onClick={() => { setSelectedSession(sess); setOpenSessionModal(true); }}
                        className="text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-white shadow-sm rounded-xl px-3.5 py-1.5 hover:bg-slate-50 transition duration-150 cursor-pointer"
                      >
                        Manage
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* AVAILABILITY PANEL */}
      {activeTab === "availability" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Availability Timeline</h2>
              <p className="text-xs text-slate-500 mt-0.5">Let clients know when you are open for bookings.</p>
            </div>
            <button
              onClick={() => { setAvailabilityDate(""); setOpenAvailability(true); }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-black text-white text-sm font-semibold rounded-xl shadow-sm transition-all duration-150 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Block
            </button>
          </div>

          {allavaibility.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center shadow-sm">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-700">No scheduled hours</p>
              <p className="text-xs text-slate-400 mt-1">Set open calendar spaces so students can request sessions.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allavaibility.map((slot: any) => (
                <div key={slot.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">
                      {new Date(slot.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(slot.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-50">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Active Window
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PROGRESS PANEL */}
      {activeTab === "progress" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Client Performance</h2>
            <p className="text-xs text-slate-500 mt-0.5">Audit tracking details regarding assigned routines.</p>
          </div>

          {progress.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center shadow-sm">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-700">No tracks active</p>
              <p className="text-xs text-slate-400 mt-1">Assigned workouts progress statuses show up dynamically.</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-sm">
              {progress.map((item: any) => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm shadow-inner shrink-0">
                      {item.member?.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-semibold text-slate-800 text-sm">{item.member?.name}</h4>
                      <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                        <Dumbbell className="w-3 h-3" />
                        {item.plan?.name}
                      </p>
                      {item.plan?.description && (
                        <p className="text-xs text-slate-400 max-w-xl line-clamp-1">{item.plan.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end border-t sm:border-0 pt-3 sm:pt-0">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
                      item.status === "COMPLETED"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === "COMPLETED" ? "bg-emerald-500" : "bg-amber-500"}`} />
                      {item.status || "PENDING"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CREATE WORKOUT MODAL */}
      <Modal open={openWorkout} onClose={() => setopenWorkout(false)} title="Create Workout Plan" onCancel={() => setopenWorkout(false)} onSave={submitPlans} saveLabel="Create Blueprint">
        <div className="space-y-4 py-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Routine Title</label>
            <input 
              name="title" 
              value={form.title} 
              onChange={handleinput} 
              className="border border-slate-200 text-slate-900 bg-slate-50/50 p-3 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm transition" 
              placeholder="e.g., High-Intensity Metabolic Conditioning" 
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Summary / Descriptions</label>
            <input 
              name="description" 
              value={form.description} 
              onChange={handleinput} 
              className="border border-slate-200 text-slate-900 bg-slate-50/50 p-3 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm transition" 
              placeholder="e.g., A comprehensive 45-minute circuit targeting hypertrophic endurance." 
            />
          </div>
        </div>
      </Modal>

      {/* ASSIGN MEMBER MODAL */}
      <Modal open={openAssignMember} onCancel={() => setopenassignMember(false)} onClose={() => setopenassignMember(false)} title="Assign Workout Plan">
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1 py-1">
          {getmembers.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">No members listed currently.</p>
          ) : (
            getmembers.map((member: any) => (
              <div key={member?.id} className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3.5 shadow-sm hover:border-slate-300 transition">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-600 uppercase">
                    {member?.name?.[0] || "M"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 leading-none">{member?.name}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {member?.email}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleAssignWorkout(member.id)} 
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 border border-blue-100 hover:border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-xl px-3 py-2 transition cursor-pointer"
                >
                  <UserPlus className="w-3 h-3" />
                  Assign
                </button>
              </div>
            ))
          )}
        </div>
      </Modal>

      {/* AVAILABILITY MODAL */}
      <Modal open={openAvailability} onClose={() => setOpenAvailability(false)} title="Configure Availability Block" onCancel={() => setOpenAvailability(false)} onSave={handleAddAvailability} saveLabel="Open Window">
        <div className="flex flex-col gap-1.5 py-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Target Date & Starting Timestamp</label>
          <input 
            type="datetime-local" 
            value={availabilityDate} 
            onChange={(e) => setAvailabilityDate(e.target.value)}
            className="border border-slate-200 p-3 rounded-xl text-slate-900 bg-slate-50/50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm transition" 
          />
        </div>
      </Modal>

      {/* SESSION UPDATE MODAL */}
      <Modal open={openSessionModal} onClose={() => setOpenSessionModal(false)} onCancel={() => setOpenSessionModal(false)} title="Re-evaluate Session Status">
        {selectedSession && (
          <div className="space-y-5 py-1">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500">Attendee</span>
                <span className="font-semibold text-slate-800">{selectedSession.member?.name}</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200/60 pt-2.5">
                <span className="text-xs font-medium text-slate-500">Schedule Details</span>
                <span className="text-slate-700 font-medium">{new Date(selectedSession.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200/60 pt-2.5">
                <span className="text-xs font-medium text-slate-500">Current Standing</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">{selectedSession.status}</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => handleUpdateStatus(selectedSession.id, "COMPLETED")}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition shadow-sm shadow-emerald-100 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                Complete
              </button>
              <button 
                onClick={() => handleUpdateStatus(selectedSession.id, "CANCELLED")}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-sm bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-semibold transition border border-rose-100 cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                Cancel Session
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}