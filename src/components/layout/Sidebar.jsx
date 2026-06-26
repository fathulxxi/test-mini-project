import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 flex flex-col h-full">
      <div className="p-6 border-b border-slate-200/60">
        <p className="text-xs text-slate-500 uppercase tracking-wider">Welcome</p>
        <p className="font-semibold text-slate-900 mt-0.5">{user?.firstName} {user?.lastName}</p>
        <div className="mt-3 h-1 w-8 bg-linear-to-r from-indigo-500 to-indigo-600 rounded-full"></div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              isActive
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100/60 font-medium'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              isActive
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100/60 font-medium'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
            }`
          }
        >
          Products
        </NavLink>
      </nav>
      <div className="p-4 border-t border-slate-200/60">
        <button
          onClick={handleLogout}
          className="text-red-600 hover:bg-red-50 w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
