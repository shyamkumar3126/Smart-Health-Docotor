import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, Calendar, Settings, LogOut, Menu, User as UserIcon, Shield, AlertCircle, Pill, FlaskConical, Video, Building2 } from 'lucide-react';
import { UserRole, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();

  if (!user || location.pathname === '/login' || location.pathname === '/register') {
    return <>{children}</>;
  }

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const cancelLogout = () => {
      setShowLogoutConfirm(false);
  };

  const getNavLinks = () => {
    switch (user.role) {
      case UserRole.PATIENT:
        return [
          { to: '/patient/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/patient/find-doctor', icon: Stethoscope, label: 'Find Doctor' },
          { to: '/patient/history', icon: Calendar, label: 'My Appointments' },
          { to: '/patient/lab-tests', icon: FlaskConical, label: 'Lab Tests' },
          { to: '/patient/online-consult', icon: Video, label: 'Online Consult' },
          { to: '/patient/medicines', icon: Pill, label: 'Medicine Order' },
          { to: '/patient/health-records', icon: Shield, label: 'Health Records' }, // Kept for completeness if implemented later or reusing PatientProfile
          { to: '/patient/clinics', icon: Building2, label: 'Clinic Finder' },
          { to: '/patient/profile', icon: UserIcon, label: 'My Profile' },
        ];
      case UserRole.DOCTOR:
        return [
          { to: '/doctor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/doctor/appointments', icon: Calendar, label: 'Schedule' },
          { to: '/doctor/profile', icon: UserIcon, label: 'Profile' },
        ];
      case UserRole.ADMIN:
        return [
          { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
          { to: '/admin/users', icon: UserIcon, label: 'User Management' },
          { to: '/admin/settings', icon: Settings, label: 'Settings' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-lg">
                <Shield className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-slate-800">MediConnect</span>
          </div>

          {/* User Info */}
          <div className="p-6 flex items-center gap-3 bg-slate-50/50">
             <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0d9488&color=fff`} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
             />
             <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role.toLowerCase()}</p>
             </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
            {getNavLinks().map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-teal-50 text-teal-700 shadow-sm border border-teal-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <link.icon size={20} />
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-100">
            <button
              onClick={handleLogoutClick}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
             <div className="bg-teal-600 p-1.5 rounded-md">
                <Shield className="text-white w-5 h-5" />
            </div>
             <span className="font-bold text-slate-800">MediConnect</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6 transform scale-100 transition-transform">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                        <AlertCircle size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Sign Out</h3>
                    <p className="text-slate-500 mt-2">Are you sure you want to sign out of your account?</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={cancelLogout}
                        className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={confirmLogout}
                        className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                    >
                        Yes, Sign Out
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};