"use client";
import AdminMain from "@/components/admin/adminMain";
import AdminStatCard from "@/components/admin/adminStatCard";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { usePlans } from "@/hooks/usePlans";
import { deleteUser, createSubPlan } from "@/lib/services/adminServices";

import { createTrainer, createMember } from "@/lib/services/adminServices";
export default function AdminPage() {
  const { users: trainers, refetch: refetchTrainers } = useUsers("TRAINER");
  const { users: members, refetch: refetchMembers } = useUsers("MEMBER");
  const [addData, setaddData] = useState(false);
  const [deleteData, setdeleteData] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [deleteError, setDeleteError] = useState<string>("");
  const [addError, setAddError] = useState<string>("");

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
        refetchTrainers();
      }

      if (createType === "MEMBER") {
        await createMember(payload);
        refetchMembers();
      }
      if (createType === "PLAN") {
        await createSubPlan({
          name: form.planName,
          price: Number(form.planPrice),
          durationDays: Number(form.planDays),
        });
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
    } catch (err:any) {
      setAddError(err.response?.data?.message || "Error");
    }
  };

  const { plans, loading, refetch } = usePlans();
  return (
    <div>
      <AdminStatCard plans={plans} />
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
         {addError && (
          <p className="text-red-500 text-sm mt-2">{addError}</p>
        )}
      </Modal>

      <AdminMain
        onAdd={handleAdd}
        ondelete={handledelete}
        plans={plans}
        trainers={trainers}
        members={members}
      />

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
