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
                                className="w-32 h-32 rounded-full border-4 border-slate-50 shadow