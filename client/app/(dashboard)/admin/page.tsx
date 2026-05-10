"use client";
import AdminMain from "@/components/admin/adminMain";
import AdminStatCard from "@/components/admin/adminStatCard";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { usePlans } from "@/hooks/usePlans";
import { toast } from "react-toastify";
import {
  deleteUser,
  createSubPlan,
  assignPlan,
  getAssignPlan,
} from "@/lib/services/adminServices";

import { createTrainer, createMember } from "@/lib/services/adminServices";
export default function AdminPage() {
  const { users: trainers, refetch: refetchTrainers } = useUsers("TRAINER");
  const { users: members, refetch: refetchMembers } = useUsers("MEMBER");
  const { plans, loading, refetch } = usePlans();
  const [addData, setaddData] = useState(false);
  const [deleteData, setdeleteData] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [deleteError, setDeleteError] = useState<string>("");
  const [addError, setAddError] = useState<string>("");
  const [selectAssign, setselectAssign] = useState(false);
  const [assignMemberId, setassignMemberId] = useState<string>("");
  const [assignError, setassignError] = useState<string>("");
  const [singleMemberPlan, setSingleMemberId] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    planName: "",
    planPrice: "",
    planDays: "",
  });
  const [createType, setCreateType] = useState<
    "TRAINER" | "MEMBER" | "PLAN" | null
  >(null);
  const handleAdd = (type: "TRAINER" | "MEMBER" | "PLAN") => {
    setCreateType(type);
    setForm({
      name: "",
      email: "",
      password: "",
      planName: "",
      planPrice: "",
      planDays: "",
    });
    setaddData(true);
  };
  const handledelete = async (id: string) => {
    try {
      setSelectedId(id);
      setDeleteError("");
      setdeleteData(true);
    } catch (err) {
      console.error(err);
    }
  };
  const handledeletebyid = async () => {
    try {
      await deleteUser(selectedId);
      refetchTrainers();
      refetchMembers();
      setdeleteData(false);
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || "Failed to delete user");
      // or show an error toast/message to user
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = async () => {
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
      };

      if (createType === "TRAINER") {
        await createTrainer(payload);

        toast.success("Created Trainer Sucessfully !");

        refetchTrainers();
      }

      if (createType === "MEMBER") {
        await createMember(payload);
        toast.success("Created Member Sucessfully !");
        refetchMembers();
      }
      if (createType === "PLAN") {
        await createSubPlan({
          name: form.planName,
          price: Number(form.planPrice),
          durationDays: Number(form.planDays),
        });
        toast.success("Created Plan Sucessfully !");
        refetch();
      }

      // plans would be different later
      setaddData(false);
      setForm({
        name: "",
        email: "",
        password: "",
        planName: "",
        planPrice: "",
        planDays: "",
      });
    } catch (err: any) {
      setAddError(err.response?.data?.message || "Error");
      toast.error("Failed to create user");
    }
  };

  const handleAssign = async (id: string) => {
    const assignData = await getAssignPlan(id);
    setSingleMemberId(assignData[0]?.status || "");
    setEndDate(assignData[0]?.endDate || "");
    setassignMemberId(id);
    setassignError("");
    setselectAssign(true);
  };

  const handleAssignById = async (id: string) => {
    try {
      await assignPlan({ memberId: assignMemberId, planId: id });
      setselectAssign(false);
      toast.success("Assigned Plan Sucessfully !");
    } catch (err: any) {
      setassignError(err.response?.data?.message || "Failed to delete user");
      toast.error("Plan is already assign");
    }
  };
  const daysLeft = endDate
    ? Math.ceil(
        (new Date(endDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : 0;

  return (
    <div>
      <AdminStatCard plans={plans} />
      {/* modal for adding member,trainer,plans*/}
      <Modal
        open={addData}
        onClose={() => setaddData(false)}
        title={`Add ${createType}`}
        onCancel={() => setaddData(false)}
        onSave={addUser}
      >
        <div className="flex flex-col gap-3">
          {createType !== "PLAN" && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="border border-gray-200 text-black p-2.5 rounded-lg outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="border border-gray-200 p-2.5 rounded-lg text-black outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="border border-gray-200 p-2.5 rounded-lg text-black outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </>
          )}

          {createType === "PLAN" && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Plan Name
                </label>
                <input
                  name="planName"
                  value={form.planName}
                  onChange={handleChange}
                  placeholder="Enter plan name"
                  className="border border-gray-200 p-2.5 rounded-lg text-black outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Price
                </label>
                <input
                  name="planPrice"
                  value={form.planPrice}
                  onChange={handleChange}
                  placeholder="Enter price"
                  type="number"
                  className="border border-gray-200 p-2.5 rounded-lg text-black outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">
                  Days
                </label>
                <input
                  name="planDays"
                  value={form.planDays}
                  onChange={handleChange}
                  placeholder="Enter Days"
                  type="number"
                  className="border border-gray-200 p-2.5 rounded-lg text-black outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </>
          )}
        </div>
        {addError && <p className="text-red-500 text-sm mt-2">{addError}</p>}
      </Modal>

      {/* model for assigning the plan to the member */}
      <Modal
        open={selectAssign}
        onClose={() => setselectAssign(false)}
        title="Assign the plan"
      >
        <div className="mb-3">
          {singleMemberPlan && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                ACTIVE
              </span>
              <span className="text-sm text-gray-600">
                {daysLeft} days left
              </span>
            </div>
          )}
        </div>
        <div className="overflow-y-auto max-h-80">
          <div className="flex flex-col gap-3">
            {plans.map((plan: any) => (
              <div
                key={plan.id}
                className="min-w-[200px] flex flex-row justify-between items-center   bg-white border border-gray-200 rounded-xl p-4"
              >
                <div>
                  <p className="font-medium text-gray-800">{plan.name}</p>
                  <p className="text-sm text-gray-400">
                    Rs {plan.price} · {plan.durationDays} days
                  </p>
                </div>
                <div>
                  {singleMemberPlan === "ACTIVE" ? (
                    <button
                      disabled
                      className="text-xs text-gray-400 border border-gray-200 rounded-lg px-3 py-1.5 cursor-not-allowed"
                    >
                      Assigned
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAssignById(plan.id)}
                      className="text-xs cursor-pointer text-green-500 border border-green-200 rounded-lg px-3 py-1.5 hover:bg-green-50 transition"
                    >
                      Assign
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {assignError && (
          <p className="text-red-500 text-sm mt-2">{assignError}</p>
        )}
      </Modal>

      <AdminMain
        onAdd={handleAdd}
        ondelete={handledelete}
        onAssign={handleAssign}
        plans={plans}
        trainers={trainers}
        members={members}
      />

      {/* model for deleting the id */}
      <Modal
        open={deleteData}
        onClose={() => setdeleteData(false)}
        title="Delete User?"
        onCancel={() => setdeleteData(false)}
        onDelete={handledeletebyid}
      >
        <p className="text-black">Are you sure you want to delete?</p>
        {deleteError && (
          <p className="text-red-500 text-sm mt-2">{deleteError}</p>
        )}
      </Modal>
    </div>
  );
}
