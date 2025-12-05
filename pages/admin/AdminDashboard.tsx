import React from 'react';
import { Users, Activity, AlertTriangle, Settings } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-2xl font-bold text-slate-800">Admin Panel</h1>
        <p className="text-slate-500">System Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-slate-500 text-sm mb-1">Total Users</p>
                    <h3 className="text-3xl font-bold text-slate-800">2,543</h3>
                </div>
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Users size={24} />
                </div>
            </div>
            <div className="mt-4 flex gap-2">
                <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">Doctors: 45</span>
                <span className="text-xs px-2 py-1 bg-slate-100 rounded text-slate-600">Patients: 2,498</span>
            </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <div className="flex justify-between items-start">
                <div>
                    <p className="text-slate-500 text-sm mb-1">System Health</p>
                    <h3 className="text-3xl font-bold text-green-600">98%</h3>
                </div>
                <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <Activity size={24} />
                </div>
            </div>
             <p className="text-xs text-slate-400 mt-4">All services operational</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <div className="flex justify-between items-start">
                <div>
                    <p className="text-slate-500 text-sm mb-1">Reports</p>
                    <h3 className="text-3xl font-bold text-orange-600">12</h3>
                </div>
                <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                    <AlertTriangle size={24} />
                </div>
            </div>
             <p className="text-xs text-slate-400 mt-4">Requires attention</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Recent Activity Log</h2>
            <button className="text-sm text-teal-600 hover:underline">View All</button>
        </div>
        <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                    <th className="px-6 py-3">User</th>
                    <th className="px-6 py-3">Action</th>
                    <th className="px-6 py-3">Date</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4 font-medium text-slate-800">User #{2400 + i}</td>
                        <td className="px-6 py-4 text-slate-600">Booked an appointment with Dr. Wilson</td>
                        <td className="px-6 py-4 text-slate-400">2 mins ago</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};