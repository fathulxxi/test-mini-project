export default function Loader({ fullPage = false }) {
  const spinner = (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
