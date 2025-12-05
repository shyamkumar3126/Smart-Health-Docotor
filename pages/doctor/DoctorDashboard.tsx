import React, { useEffect, useState } from 'react';
import { Users, Calendar, DollarSign, Clock, Check, X } from 'lucide-react';
import { User, Appointment, UserRole } from '../../types';
import { getAppointments, updateAppointmentStatus } from '../../services/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const DoctorDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    getAppointments(user.id, UserRole.DOCTOR).then(setAppointments);
  }, [user.id]);

  const handleStatus = async (id: string, status: Appointment['status']) => {
    await updateAppointmentStatus(id, status);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const stats = [
    { label: 'Total Patients', value: '124', icon: Users, color: 'bg-blue-500' },
    { label: 'Appointments Today', value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length.toString(), icon: Calendar, color: 'bg-teal-500' },
    { label: 'Pending Requests', value: appointments.filter(a => a.status === 'PENDING').length.toString(), icon: Clock, color: 'bg-orange-500' },
    { label: 'Earnings (Mo)', value: '$12,450', icon: DollarSign, color: 'bg-indigo-500' },
  ];

  const chartData = [
    { name: 'Mon', patients: 12 },
    { name: 'Tue', patients: 18 },
    { name: 'Wed', patients: 15 },
    { name: 'Thu', patients: 22 },
    { name: 'Fri', patients: 20 },
    { name: 'Sat', patients: 8 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Doctor Dashboard</h1>
        <p className="text-slate-500">Overview of your practice</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${stat.color}`}>
                <stat.icon size={24} />
            </div>
            <div>
                <p className="text-slate-500 text-sm">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Appointments List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Upcoming Appointments</h2>
            <div className="space-y-4">
                {appointments.length > 0 ? appointments.map(apt => (
                    <div key={apt.id} className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold">
                                {apt.patientName.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">{apt.patientName}</h4>
                                <p className="text-sm text-slate-500">{apt.date} at {apt.time}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                             {apt.status === 'PENDING' ? (
                                <>
                                    <button 
                                        onClick={() => handleStatus(apt.id, 'CONFIRMED')}
                                        className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition" 
                                        title="Confirm"
                                    >
                                        <Check size={18} />
                                    </button>
                                    <button 
                                        onClick={() => handleStatus(apt.id, 'CANCELLED')}
                                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition" 
                                        title="Cancel"
                                    >
                                        <X size={18} />
                                    </button>
                                </>
                             ) : (
                                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase
                                    ${apt.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 
                                      apt.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-600'}
                                `}>
                                    {apt.status}
                                </span>
                             )}
                        </div>
                    </div>
                )) : (
                    <p className="text-slate-400 text-center py-8">No appointments found.</p>
                )}
            </div>
        </div>

        {/* Analytics Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Patient Visits</h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip 
                            cursor={{fill: '#f1f5f9'}} 
                            contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                        />
                        <Bar dataKey="patients" fill="#0d9488" radius={[6, 6, 0, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};