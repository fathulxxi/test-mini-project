import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { loginApi } from '../api/authApi';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuthStore();

  const [form, setForm] = useState({
    username: 'emilys',
    password: 'emilyspass',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginApi(form);
      const { accessToken, ...userData } = res.data;
      login(userData, accessToken);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-slate-50 to-indigo-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg shadow-indigo-100/50 border border-slate-200/60 backdrop-blur-sm w-full max-w-sm p-8 hover:shadow-xl hover:shadow-indigo-100/60 transition-all duration-300">
        <div className="space-y-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Sign <span className="bg-linear-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">in</span>
            </h1>
          </div>
          <div className="h-1 w-16 bg-linear-to-r from-indigo-500 to-indigo-600 rounded-full"></div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200/60 rounded-xl p-3 text-sm text-red-600 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full mt-4"
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full mt-6"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
