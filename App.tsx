import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { FindDoctor } from './pages/patient/FindDoctor';
import { AppointmentHistory } from './pages/patient/AppointmentHistory';
import { PatientProfile } from './pages/patient/PatientProfile';
import { MedicineOrdering } from './pages/patient/MedicineOrdering';
import { LabTests } from './pages/patient/LabTests';
import { OnlineConsult } from './pages/patient/OnlineConsult';
import { ClinicFinder } from './pages/patient/ClinicFinder';
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { Settings } from './pages/admin/Settings';
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
            element={user?.role === UserRole.PATIENT ? <AppointmentHistory user={user} /> : <Navigate to="/login" />} 
          />
           <Route 
            path="/patient/profile" 
            element={user?.role === UserRole.PATIENT ? <PatientProfile user={user} /> : <Navigate to="/login" />} 
          />
          {/* New Patient Routes */}
          <Route 
            path="/patient/medicines" 
            element={user?.role === UserRole.PATIENT ? <MedicineOrdering /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/patient/lab-tests" 
            element={user?.role === UserRole.PATIENT ? <LabTests /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/patient/online-consult" 
            element={user?.role === UserRole.PATIENT ? <OnlineConsult /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/patient/clinics" 
            element={user?.role === UserRole.PATIENT ? <ClinicFinder /> : <Navigate to="/login" />} 
          />
           <Route 
            path="/patient/health-records" 
            element={user?.role === UserRole.PATIENT ? <PatientProfile user={user} /> : <Navigate to="/login" />} 
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
            element={user?.role === UserRole.ADMIN ? <Settings /> : <Navigate to="/login" />} 
          />
        </Routes>
        
        {/* Only show AI chat for logged in users */}
        {user && <AIChat />}
      </Layout>
    </HashRouter>
  );
};

export default App;