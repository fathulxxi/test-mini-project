import useAuthStore from '../../store/useAuthStore';

export default function Navbar() {
  const user = useAuthStore((s) => s.user);

  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm shadow-indigo-100/30 flex items-center justify-between px-6">
      <h1 className="text-lg font-bold bg-linear-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent tracking-tight">
        Dashboard
      </h1>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
        <span className="text-sm text-slate-600">{user?.email}</span>
      </div>
    </header>
  );
}
