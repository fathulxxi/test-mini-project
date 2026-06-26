import useAuthStore from "../store/useAuthStore";

export default function HomePage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-50 to-indigo-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Welcome Card */}
        <div className="rounded-2xl bg-white shadow-lg shadow-indigo-100/50 border border-slate-200/60 p-6 sm:p-8 lg:p-12 backdrop-blur-sm hover:shadow-xl hover:shadow-indigo-100/60 transition-all duration-300">
          {/* Greeting Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                Welcome, <span className="bg-linear-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">{user?.firstName} {user?.lastName}</span>!
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Select a menu from the sidebar to get started.
            </p>

            {/* Decorative Divider */}
            <div className="pt-2">
              <div className="h-1 w-12 sm:w-16 bg-linear-to-r from-indigo-500 to-indigo-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
