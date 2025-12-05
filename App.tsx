import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { FindDoctor } from './pages/patient/FindDoctor';
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { AIChat } from './components/AIChat';
import { User, UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Check for persisted session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <HashRouter>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to={user ? `/${user.role.toLowerCase()}/dashboard` : "/login"} replace />} />
          
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          {/* Patient Routes */}
          <Route 
            path="/patient/dashboard" 
            element={user?.role === UserRole.PATIENT ? <PatientDashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/patient/find-doctor" 
            element={user?.role === UserRole.PATIENT ? <FindDoctor user={user} /> : <Navigate to="/login" />} 
          />
           <Route 
            path="/patient/history" 
            element={user?.role === UserRole.PATIENT ? <div className="text-center mt-20 text-slate-500">History Module Placeholder</div> : <Navigate to="/login" />} 
          />

          {/* Doctor Routes */}
          <Route 
            path="/doctor/dashboard" 
            element={user?.role === UserRole.DOCTOR ? <DoctorDashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/doctor/appointments" 
            element={user?.role === UserRole.DOCTOR ? <div className="text-center mt-20 text-slate-500">Schedule Management Placeholder</div> : <Navigate to="/login" />} 
          />
           <Route 
            path="/doctor/profile" 
            element={user?.role === UserRole.DOCTOR ? <div className="text-center mt-20 text-slate-500">Profile Management Placeholder</div> : <Navigate to="/login" />} 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={user?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
           <Route 
            path="/admin/users" 
            element={user?.role === UserRole.ADMIN ? <UserManagement /> : <Navigate to="/login" />} 
          />
           <Route 
            path="/admin/settings" 
            element={user?.role === UserRole.ADMIN ? <div className="text-center mt-20 text-slate-500">Site Settings Placeholder</div> : <Navigate to="/login" />} 
          />
        </Routes>
        
        {/* Only show AI chat for logged in users */}
        {user && <AIChat />}
      </Layout>
    </HashRouter>
  );
};

export default App;