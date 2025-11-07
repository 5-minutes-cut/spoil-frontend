type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl bg-bg-white p-6 shadow-card">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mb-6 text-sm leading-6 text-gray-600">{description}</p>
        )}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-brand-tertiary bg-bg-white px-4 py-2 text-sm text-gray-700 hover:bg-brand-tertiary"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-bg-white hover:bg-brand-hover"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
