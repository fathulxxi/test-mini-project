export default function Input({ label, error, className, ...rest }) {
  const inputClasses = `px-3 py-2 border rounded-lg text-sm outline-none transition-colors ${
    error
      ? 'border-red-400 focus:ring-2 focus:ring-red-200'
      : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
  } ${className || ''}`;

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input className={inputClasses} {...rest} />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
