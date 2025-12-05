import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Activity, AlertCircle } from 'lucide-react';
import { User, Appointment, UserRole } from '../../types';
import { getAppointments } from '../../services/mockData';
import { Link } from 'react-router-dom';

export const PatientDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    getAppointments(user.id, UserRole.PATIENT).then(setAppointments);
  }, [user.id]);

  const upcoming = appointments.find(a => new Date(a.date) >= new Date());

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Hello, {user.name}</h1>
            <p className="text-teal-100 max-w-xl">
            Welcome to your health dashboard. You can manage your appointments, find specialists, and track your medical history here.
            </p>
            <Link to="/patient/find-doctor" className="inline-block mt-6 bg-white text-teal-700 px-6 py-2.5 rounded-full font-semibold hover:bg-teal-50 transition shadow-lg">
                Book New Appointment
            </Link>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <Activity size={300} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Next Appointment Card */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Calendar className="text-teal-600" size={20} />
                    Upcoming Appointment
                </h2>
                <Link to="/patient/history" className="text-sm text-teal-600 hover:underline">View all</Link>
            </div>

            {upcoming ? (
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="bg-teal-100 p-4 rounded-xl text-center min-w-[80px]">
                        <span className="block text-2xl font-bold text-teal-700">{new Date(upcoming.date).getDate()}</span>
                        <span className="text-xs font-semibold text-teal-600 uppercase">
                            {new Date(upcoming.date).toLocaleString('default', { month: 'short' })}
                        </span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-800">{upcoming.doctorName}</h3>
                        <p className="text-sm text-slate-500 mb-2">Specialist Consultation</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Clock size={14} /> {upcoming.time}</span>
                            <span className="flex items-center gap-1"><MapPin size={14} /> Clinic Visit</span>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Confirmed
                    </span>
                </div>
            ) : (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <Calendar className="mx-auto text-slate-300 mb-3" size={32} />
                    <p className="text-slate-500">No upcoming appointments scheduled.</p>
                </div>
            )}
        </div>

        {/* Quick Stats/Alerts */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                 <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Activity className="text-orange-500" size={20} />
                    Health Status
                </h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">BMI</span>
                        <span className="font-semibold text-slate-800">22.4</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Blood Pressure</span>
                        <span className="font-semibold text-slate-800">120/80</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Heart Rate</span>
                        <span className="font-semibold text-slate-800">72 bpm</span>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                 <h2 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <AlertCircle size={20} />
                    Reminders
                </h2>
                <p className="text-sm text-blue-700 leading-relaxed">
                    It's flu season! Don't forget to ask your doctor about the annual flu shot during your next visit.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};