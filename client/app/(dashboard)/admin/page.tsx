"use client";
import AdminMain from "@/components/admin/adminMain";
import AdminStatCard from "@/components/admin/adminStatCard";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { usePlans } from "@/hooks/usePlans";

import{createTrainer,createMember} from '@/lib/services/adminServices'
export default function AdminPage() {
    const { users: trainers, refetch: refetchTrainers } = useUsers("TRAINER")
   const { users: members, refetch: refetchMembers } = useUsers("MEMBER")
  const [addData, setaddData] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [createType, setCreateType] = useState<
    "TRAINER" | "MEMBER" | "PLAN" | null
  >(null);
  const handleAdd = (type: "TRAINER" | "MEMBER" | "PLAN") => {
    setCreateType(type);
    setForm({ name: "", email: "", password: "" });
    setaddData(true);
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
    }

    if (createType === "TRAINER") {
      await createTrainer(payload)
       refetchTrainers()
    }

    if (createType === "MEMBER") {
      await createMember(payload)
     refetchMembers()  
    }
    // plans would be different later
    setaddData(false)
    setForm({ name: "", email: "", password: "" })
  } catch (err) {
    console.error(err)
  }
}

const { plans, loading, refetch } = usePlans()
  return (
    <div>
      <AdminStatCard  plans={plans} />
      <Modal
        open={addData}
        onClose={() => setaddData(false)}
        title={`Add ${createType}`}
        onCancel={() => setaddData(false)}
        onSave={addUser}
      >
        <div className="flex flex-col gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 rounded"
          />
        </div>
      </Modal>
      <AdminMain onAdd={handleAdd}  plans={plans} />
    </div>
  );
}
