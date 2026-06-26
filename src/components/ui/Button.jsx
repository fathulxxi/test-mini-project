export default function Button({
  children,
  variant = 'primary',
  loading = false,
  className = '',
  ...rest
}) {
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const computedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      className={computedClasses}
      disabled={loading}
      {...rest}
    >
      {loading && <span className="mr-2 animate-spin">⟳</span>}
      {children}
    </button>
  );
}
