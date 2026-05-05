type Props = {
  count: number
  onAdd: () => void

  
  
}

export default function AdminStatCard({ count, onAdd }: Props) {
  return (
    <div className="bg-white border rounded-lg flex justify-between p-6">
      <div className="bg-gray-50 flex flex-col justify-center p-6 w-48 rounded-lg">
        <p className="text-sm text-gray-800">Total Admins</p>
        <p className="text-3xl font-semibold text-black mt-1">{count}</p>
      </div>
      <button onClick={onAdd} className="bg-blue-800 w-30 h-8 rounded-lg hover:bg-blue-700 cursor-pointer text-white">
        + Add Admin
      </button>
      
    </div>
  )
}