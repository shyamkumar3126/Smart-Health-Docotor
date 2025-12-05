import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, X, CheckCircle, Hourglass, Filter } from 'lucide-react';
import { Appointment, User, UserRole } from '../../types';
import { getAppointments, cancelAppointment } from '../../services/mockData';

export const AppointmentHistory: React.FC<{ user: User }> = ({ user }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    useEffect(() => {
        loadAppointments();
    }, [user.id]);

    const loadAppointments = async () => {
        setLoading(true);
        try {
            const data = await getAppointments(user.id, UserRole.PATIENT);
            setAppointments(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id: string) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            await cancelAppointment(id);
            loadAppointments(); // Refresh list
        }
    };

    const getStatusBadge = (status: Appointment['status']) => {
        switch (status) {
            case 'CONFIRMED':
                return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700"><CheckCircle size={12} /> Confirmed</span>;
            case 'PENDING':
                return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700"><Hourglass size={12} /> Pending</span>;
            case 'CANCELLED':
                return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700"><X size={12} /> Cancelled</span>;
            case 'COMPLETED':
                return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700"><CheckCircle size={12} /> Completed</span>;
            default:
                return null;
        }
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredAppointments = appointments.filter(app => {
        const appDate = new Date(app.date);
        // Simple comparison: Future dates or today are "upcoming" unless cancelled/completed
        if (activeTab === 'upcoming') {
            return appDate >= today && app.status !== 'CANCELLED' && app.status !== 'COMPLETED';
        } else {
            return appDate < today || app.status === 'CANCELLED' || app.status === 'COMPLETED';
        }
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>
                    <p className="text-slate-500">Track your visits and scheduled consultations</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-white rounded-xl w-fit border border-slate-200">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'upcoming' 
                        ? 'bg-teal-600 text-white shadow-md' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'past' 
                        ? 'bg-teal-600 text-white shadow-md' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    History
                </button>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-slate-400">Loading appointments...</div>
                ) : filteredAppointments.length === 0 ? (
                    <div className="p-12 text-center">
                        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-800">No {activeTab} appointments</h3>
                        <p className="text-slate-500">You don't have any appointments in this category.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredAppointments.map((app) => (
                            <div key={app.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex gap-4 items-start">
                                    <div className="flex flex-col items-center bg-slate-100 p-3 rounded-xl min-w-[80px]">
                                        <span className="text-xl font-bold text-slate-800">{new Date(app.date).getDate()}</span>
                                        <span className="text-xs font-bold text-slate-500 uppercase">{new Date(app.date).toLocaleString('default', { month: 'short' })}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-slate-800 text-lg">{app.doctorName}</h3>
                                            {getStatusBadge(app.status)}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                                            <span className="flex items-center gap-1.5"><Clock size={16} /> {app.time}</span>
                                            <span className="flex items-center gap-1.5"><MapPin size={16} /> Clinic Visit</span>
                                        </div>
                                    </div>
                                </div>

                                {activeTab === 'upcoming' && (
                                    <div className="flex gap-3 w-full md:w-auto">
                                        <button 
                                            onClick={() => handleCancel(app.id)}
                                            className="flex-1 md:flex-none px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button className="flex-1 md:flex-none px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-lg text-sm font-medium transition-colors shadow-sm">
                                            Reschedule
                                        </button>
                                    </div>
                                )}
                                {activeTab === 'past' && app.status === 'COMPLETED' && (
                                    <button className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
                                        Leave Review
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};