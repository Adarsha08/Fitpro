type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  onCancel?: () => void
  onSave?: () => void
  onDelete?:()=>void
  cancelLabel?: string
  saveLabel?: string
  deleteLabel?:string
}

export default function Modal({ open, onClose, title, children, onCancel, onSave,onDelete ,cancelLabel = "Cancel", saveLabel = "Save",deleteLabel="Delete" }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl ml-auto">✕</button>
        </div>
        {children}
        {(onCancel || onSave||onDelete) && (
          <footer className="flex justify-end gap-2 mt-4">
            {onCancel && (
              <button onClick={onCancel} className="px-4 text-black cursor-pointer py-2 text-sm border rounded-lg hover:bg-gray-50">
                {cancelLabel}
              </button>
            )}
            {onSave && (
              <button onClick={onSave} className="px-4 py-2 cursor-pointer text-sm bg-blue-800 text-white rounded-lg hover:bg-blue-700">
                {saveLabel}
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete} className="px-4 py-2 cursor-pointer text-sm bg-blue-800 text-white rounded-lg hover:bg-blue-700">
                {deleteLabel}
              </button>
            )}
          </footer>
        )}
      </div>
    </div>
  )
}