import useAuthStore from '../../store/useAuthStore';

export default function Navbar() {
  const user = useAuthStore((s) => s.user);

  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium">
          {initials}
        </div>
        <span className="text-sm text-gray-600">{user?.email}</span>
      </div>
    </header>
  );
}
