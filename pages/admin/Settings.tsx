import React, { useState } from 'react';
import { Save, Bell, Shield, Globe, Power, RefreshCw } from 'lucide-react';
import { updateSystemSettings } from '../../services/mockData';

export const Settings: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        systemName: 'MediConnect',
        contactEmail: 'admin@mediconnect.com',
        maintenanceMode: false,
        allowRegistration: true,
        emailNotifications: true,
        smsNotifications: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(prev => ({ ...prev, [e.target.name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateSystemSettings(formData);
            alert('Settings saved successfully!');
        } catch (error) {
            alert('Failed to save settings.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
                <p className="text-slate-500">Configure global platform preferences</p>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* General Settings */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Globe size={20} className="text-teal-600" />
                        General Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Platform Name</label>
                            <input
                                type="text"
                                name="systemName"
                                value={formData.systemName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                            />
                        </div>
                    </div>
                </div>

                {/* System Controls */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Power size={20} className="text-orange-600" />
                        System Controls
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                                <p className="font-medium text-slate-800">Maintenance Mode</p>
                                <p className="text-xs text-slate-500">Disable access for non-admin users</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="maintenanceMode"
                                    checked={formData.maintenanceMode}
                                    onChange={handleChange}
                                    className="sr-only peer" 
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                                <p className="font-medium text-slate-800">User Registration</p>
                                <p className="text-xs text-slate-500">Allow new patients to sign up</p>
                            </div>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="allowRegistration"
                                    checked={formData.allowRegistration}
                                    onChange={handleChange}
                                    className="sr-only peer" 
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Bell size={20} className="text-blue-600" />
                        Notifications
                    </h2>
                    <div className="space-y-3">
                         <div className="flex items-center gap-3">
                            <input 
                                type="checkbox" 
                                id="emailNotif"
                                name="emailNotifications"
                                checked={formData.emailNotifications}
                                onChange={handleChange}
                                className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                            />
                            <label htmlFor="emailNotif" className="text-slate-700 text-sm font-medium">Enable Email Alerts (Booking Confirmations)</label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input 
                                type="checkbox" 
                                id="smsNotif"
                                name="smsNotifications"
                                checked={formData.smsNotifications}
                                onChange={handleChange}
                                className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                            />
                            <label htmlFor="smsNotif" className="text-slate-700 text-sm font-medium">Enable SMS Reminders</label>
                        </div>
                    </div>
                </div>

                 {/* Security Placeholder */}
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-purple-600" />
                        Security
                    </h2>
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <RefreshCw size={16} />
                        <span className="cursor-pointer hover:underline text-teal-600">Force Password Reset for All Users</span>
                    </div>
                </div>
                
                <div className="md:col-span-2 flex justify-end">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-700 transition-colors flex items-center gap-2 shadow-lg shadow-teal-600/20 disabled:opacity-70"
                    >
                        {loading ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};