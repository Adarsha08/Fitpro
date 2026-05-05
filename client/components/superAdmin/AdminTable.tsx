"use client";
import { deleteAdminByid } from "@/lib/services/superAdminService";

type Props = {
  admins: any[];
  onDelete: (id: string) => void;
};

export default function AdminForm({ admins, onDelete }: Props) {
  return (
    <div className="p-4">
      <p className="text-sm text-gray-500 mb-4">
        Total admins: <span className="font-semibold text-gray-800">{admins.length}</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {admins?.map((admin) => (
          <div
            key={admin?.id}
            className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm"
          >
            <div>
              <p className="font-medium text-gray-800">{admin?.name}</p>
              <p className="text-sm text-gray-400 mt-0.5">{admin?.email}</p>
            </div>
            <button
              onClick={() => onDelete(admin.id)}
              className="text-xs cursor-pointer text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}