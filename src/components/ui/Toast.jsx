import useToastStore from '../../store/useToastStore';

const TYPE_STYLES = {
  error: 'bg-red-600 text-white',
  success: 'bg-green-600 text-white',
  info: 'bg-blue-600 text-white',
};

export default function Toast() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg min-w-64 max-w-sm ${TYPE_STYLES[toast.type] ?? TYPE_STYLES.error}`}
        >
          <p className="flex-1 text-sm">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/70 hover:text-white text-lg leading-none mt-0.5"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
