"use client";
import { useState } from "react";
import AdminStatCard from "@/components/superAdmin/AdminStatCard";
import AdminForm from "@/components/superAdmin/AdminTable";
import CreateAdminForm from "@/components/superAdmin/CreateAdminForm";
import Modal from "@/components/ui/Modal";
import { useAdmins } from "@/hooks/useAdmins";
import { deleteAdminByid } from "@/lib/services/superAdminService";

export default function SuperAdmin() {
  const { admins, loading, error, refetch } = useAdmins();
  const [openCreate, setOpenCreate] = useState(false);

  const [deleteAdminId, setDeleteAdminId] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleDelete = async () => {
    if (!deleteAdminId) return;
    await deleteAdminByid(deleteAdminId);
    setDeleteAdminId(null);
    refetch();
  };

  return (
    <div className="min-h-screen p-6">
      <AdminStatCard count={admins.length} onAdd={() => setOpenCreate(true)}  />

     
        <AdminForm admins={admins} onDelete={(id) => setDeleteAdminId(id)} />
      

      <Modal
        open={!!deleteAdminId}
        onClose={() => setDeleteAdminId(null)}
        title="Sure you want to delete?"
        onCancel={() => setDeleteAdminId(null)}
        onSave={handleDelete}
        cancelLabel="Cancel"
        saveLabel="Delete"
      >
        <p className="text-sm text-gray-500">This action can be undone.</p>
      </Modal>

      <Modal open={openCreate} onClose={() => setOpenCreate(false)} title="Create Admin">
        <CreateAdminForm onClose={() => setOpenCreate(false)} onSuccess={refetch} />
      </Modal>
    </div>
  );
}