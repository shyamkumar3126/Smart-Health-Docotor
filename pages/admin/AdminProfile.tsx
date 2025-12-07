import React, { useState } from 'react';
import { User, Shield, Mail, Phone, Lock, Camera, Save } from 'lucide-react';
import { User as UserType } from '../../types';

interface AdminProfileProps {
    user?: UserType; // Optional, usually passed from Layout or Context
}

export const AdminProfile: React.FC<AdminProfileProps> = () => {
    const [loading, setLoading] = useState(false);
    
    // In a real app, populate this from the logged-in user context
    const [profile, setProfile] = useState({
        name: 'Admin User',
        email: 'admin@mediconnect.com',
        phone: '+1 (555) 123-4567',
        role: 'Super Administrator',
        lastLogin: 'Today, 09:41 AM'
    });

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert('Profile updated successfully!');
        }, 1000);
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert("New passwords do not match.");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setPasswords({ current: '', new: '', confirm: '' });
            alert('Password changed successfully!');
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
                <p className="text-slate-500">Manage your account details and security</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Avatar & Basic Info */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
                        <div className="relative inline-block mb-4">
                            <img 
                                src={`https://ui-avatars.com/api/?name=${profile.name}&background=0d9488&color=fff&size=128`} 
                                alt="Profile" 
                                className="w-32 h-32 rounded-full border-4 border-slate-50 shadow-md object-cover"
                            />
                            <div className="absolute bottom-0 right-0 bg-teal-600 p-2 rounded-full text-white cursor-pointer hover:bg-teal-700 transition shadow-sm">
                                <Camera size={16} />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">{profile.name}</h2>
                        <p className="text-slate-500">{profile.role}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                         <h3 className="font-bold text-slate-800 mb-4">Account Status</h3>
                         <div className="flex items-center justify-between py-2 border-b border-slate-50">
                             <span className="text-sm text-slate-500">Last Login</span>
                             <span className="text-sm font-medium text-slate-800">{profile.lastLogin}</span>
                         </div>
                         <div className="flex items-center justify-between py-2 border-b border-slate-50">
                             <span className="text-sm text-slate-500">Status</span>
                             <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Active</span>
                         </div>
                         <div className="flex items-center justify-between py-2">
                             <span className="text-sm text-slate-500">Verification</span>
                             <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Verified</span>
                         </div>
                    </div>
                </div>

                {/* Right Column: Forms */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* General Info */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <User size={20} className="text-teal-600" />
                            Personal Information
                        </h3>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={profile.name}
                                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        value={profile.email}
                                        disabled
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                    <input 
                                        type="text" 
                                        value={profile.phone}
                                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-2">
                                <button type="submit" disabled={loading} className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors">
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Security */}
                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Lock size={20} className="text-red-500" />
                            Change Password
                        </h3>
                        <form onSubmit={handleUpdatePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                <input 
                                    type="password" 
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                    <input 
                                        type="password" 
                                        value={passwords.new}
                                        onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                                    <input 
                                        type="password" 
                                        value={passwords.confirm}
                                        onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                    />
                                </div>
                            </div>
                             <div className="flex justify-end pt-2">
                                <button type="submit" disabled={loading} className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 font-medium transition-colors">
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};