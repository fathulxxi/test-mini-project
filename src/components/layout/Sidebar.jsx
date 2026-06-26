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
    <div className="w-64 bg-white border-r flex flex-col h-full">
      <div className="p-6 border-b">
        <p className="text-xs text-gray-500 uppercase">Welcome</p>
        <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`
          }
        >
          Products
        </NavLink>
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="text-red-600 hover:bg-red-50 w-full text-left px-3 py-2 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
