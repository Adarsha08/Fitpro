type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  onCancel?: () => void
  onSave?: () => void
  cancelLabel?: string
  saveLabel?: string
}

export default function Modal({ open, onClose, title, children, onCancel, onSave, cancelLabel = "Cancel", saveLabel = "Save" }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl ml-auto">✕</button>
        </div>
        {children}
        {(onCancel || onSave) && (
          <footer className="flex justify-end gap-2 mt-4">
            {onCancel && (
              <button onClick={onCancel} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
                {cancelLabel}
              </button>
            )}
            {onSave && (
              <button onClick={onSave} className="px-4 py-2 text-sm bg-blue-800 text-white rounded-lg hover:bg-blue-700">
                {saveLabel}
              </button>
            )}
          </footer>
        )}
      </div>
    </div>
  )
}