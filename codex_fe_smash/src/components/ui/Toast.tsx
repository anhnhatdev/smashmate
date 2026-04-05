import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'
import type { ToastMessage } from '../../types'

interface ToastContainerProps {
  toasts: ToastMessage[]
  onRemove: (id: string) => void
}

const ICONS = {
  success: <CheckCircle2 size={16} />,
  info: <Info size={16} />,
  warning: <AlertTriangle size={16} />,
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="toast-container" role="alert" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <span className="toast-icon">{ICONS[toast.type]}</span>
          <span className="toast-message">{toast.message}</span>
          <button
            className="toast-close"
            onClick={() => onRemove(toast.id)}
            aria-label="Đóng thông báo"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
