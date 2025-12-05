import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Upload, FileText, Trash2, Edit2, Shield, Lock, Bell, Eye, EyeOff, AlertTriangle, Smartphone, Check } from 'lucide-react';
import { User as UserType } from '../../types';

interface PatientProfileProps {
    user: UserType;
}

interface Document {
    id: string;
    name: string;
    date: string;
    size: string;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({ user }) => {
    const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    // --- Profile State ---
    const [profileData, setProfileData] = useState({
        phone: '+1 (555) 987-6543',
        address: '123 Wellness Ave, New York, NY 10001',
        dob: '1985-04-12',
        bloodGroup: 'O+',
        allergies: 'Peanuts, Penicillin',
        chronicConditions: 'None',
        emergencyContact: 'Jane Doe (+1 555-000-0000)'
    });

    const [documents, setDocuments] = useState<Document[]>([
        { id: '1', name: 'Blood_Test_Report_May_2024.pdf', date: '2024-05-15', size: '2.4 MB' },
        { id: '2', name: 'Prescription_Dr_Wilson.jpg', date: '2024-02-10', size: '1.1 MB' },
    ]);

    // --- Settings State ---
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [notifications, setNotifications] = useState({
        emailAppt: true,
        smsAppt: true,
        promo: false,
        security: true
    });

    // --- Handlers ---

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API update
        setTimeout(() => {
            setLoading(false);
            setIsEditing(false);
            alert('Profile updated successfully!');
        }, 1000);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newDoc: Document = {
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                date: new Date().toISOString().split('T')[0],
                size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
            };
            setDocuments([newDoc, ...documents]);
            alert('Document uploaded successfully!');
        }
    };

    const deleteDocument = (id: string) => {
        if(window.confirm("Remove this document?")) {
            setDocuments(documents.filter(d => d.id !== id));
        }
    };

    const handlePasswordUpdate = (e: React.FormEvent) => {
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

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-6">
            {/* Header & Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Account & Profile</h1>
                    <p className="text-slate-500">Manage your personal data and system preferences</p>
                </div>
                <div className="flex p-1 bg-slate-200/50 rounded-xl">
                   <button 
                        onClick={() => setActiveTab('profile')} 
                        className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'profile' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Profile Information
                    </button>
                   <button 
                        onClick={() => setActiveTab('settings')} 
                        className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'settings' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Settings
                    </button>
                </div>
            </div>

            {activeTab === 'profile' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* Left: Avatar & Quick Info */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
                            <div className="relative mb-4 group">
                                <img 
                                    src={user.avatar} 
                                    alt={user.name} 
                                    className="w-32 h-32 rounded-full border-4 border-slate-50 shadow-md object-cover"
                                />
                                {isEditing && (
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Upload className="text-white" size={24} />
                                        <input type="file" className="hidden" accept="image/*" />
                                    </label>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
                            <p className="text-slate-500 mb-4">{user.email}</p>
                            
                            <div className="w-full pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Blood Group</p>
                                    <p className="text-lg font-bold text-teal-600">{profileData.bloodGroup}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Age</p>
                                    <p className="text-lg font-bold text-slate-700">38</p>
                                </div>
                            </div>
                        </div>

                        {/* Documents Section */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <FileText size={20} className="text-teal-600" /> Medical Records
                            </h3>
                            
                            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-teal-400 transition-colors mb-4 group">
                                <div className="text-center">
                                    <Upload className="mx-auto h-6 w-6 text-slate-400 group-hover:text-teal-500" />
                                    <span className="text-xs text-slate-500 group-hover:text-teal-600">Upload Report (PDF/JPG)</span>
                                </div>
                                <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.jpg,.png,.jpeg" />
                            </label>

                            <div className="space-y-3">
                                {documents.map(doc => (
                                    <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="p-2 bg-white rounded-lg border border-slate-200">
                                                <FileText size={16} className="text-teal-600" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-medium text-slate-700 truncate">{doc.name}</p>
                                                <p className="text-xs text-slate-400">{doc.date} • {doc.size}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => deleteDocument(doc.id)}
                                            className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Detailed Form */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
                        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                                <User size={20} className="text-teal-600" /> Personal Details
                            </h3>
                            {!isEditing && (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors font-medium text-sm"
                                >
                                    <Edit2 size={16} /> Edit Details
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleProfileSave} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={user.name} 
                                        disabled 
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        value={user.email} 
                                        disabled 
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
                                        <input 
                                            type="tel" 
                                            value={profileData.phone}
                                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${isEditing ? 'bg-white border-slate-200' : 'bg-slate-50 border-transparent'}`}
                                        />
                                    </div>
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                                    <input 
                                        type="date" 
                                        value={profileData.dob}
                                        onChange={(e) => setProfileData({...profileData, dob: e.target.value})}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${isEditing ? 'bg-white border-slate-200' : 'bg-slate-50 border-transparent'}`}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
                                        <input 
                                            type="text" 
                                            value={profileData.address}
                                            onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${isEditing ? 'bg-white border-slate-200' : 'bg-slate-50 border-transparent'}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                 <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6 text-lg">
                                    <Shield size={20} className="text-red-500" /> Medical Information
                                </h3>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group</label>
                                        <select 
                                            value={profileData.bloodGroup}
                                            onChange={(e) => setProfileData({...profileData, bloodGroup: e.target.value})}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${isEditing ? 'bg-white border-slate-200' : 'bg-slate-50 border-transparent'}`}
                                        >
                                            <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                                            <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact</label>
                                        <input 
                                            type="text" 
                                            value={profileData.emergencyContact}
                                            onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${isEditing ? 'bg-white border-slate-200' : 'bg-slate-50 border-transparent'}`}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Allergies</label>
                                        <textarea 
                                            rows={2}
                                            value={profileData.allergies}
                                            onChange={(e) => setProfileData({...profileData, allergies: e.target.value})}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${isEditing ? 'bg-white border-slate-200' : 'bg-slate-50 border-transparent'}`}
                                        />
                                    </div>
                                     <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Chronic Conditions</label>
                                        <textarea 
                                            rows={2}
                                            value={profileData.chronicConditions}
                                            onChange={(e) => setProfileData({...profileData, chronicConditions: e.target.value})}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${isEditing ? 'bg-white border-slate-200' : 'bg-slate-50 border-transparent'}`}
                                        />
                                    </div>
                                 </div>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end pt-4 gap-3">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20 flex items-center gap-2 font-medium"
                                    >
                                        {loading ? <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span> : <Save size={18} />}
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* Security Settings */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Lock size={20} className="text-blue-600" />
                            Security & Password
                        </h2>
                        <form onSubmit={handlePasswordUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                <input 
                                    type="password" 
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                                        value={passwords.new}
                                        onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                                <input 
                                    type="password" 
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                />
                            </div>
                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    disabled={loading || !passwords.current || !passwords.new}
                                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50"
                                >
                                    {loading ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Notification Settings */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Bell size={20} className="text-orange-500" />
                            Notification Preferences
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-800">Email Notifications</h4>
                                        <p className="text-xs text-slate-500">Get confirmation emails for appointments</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={notifications.emailAppt} onChange={() => toggleNotification('emailAppt')} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        <Smartphone size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-800">SMS Alerts</h4>
                                        <p className="text-xs text-slate-500">Receive reminders on your phone</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={notifications.smsAppt} onChange={() => toggleNotification('smsAppt')} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                </label>
                            </div>

                             <div className="flex items-center justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                        <Shield size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-800">Security Alerts</h4>
                                        <p className="text-xs text-slate-500">Notify me about login attempts</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={notifications.security} onChange={() => toggleNotification('security')} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="md:col-span-2 bg-red-50 p-6 rounded-2xl border border-red-100 mt-4">
                        <div className="flex items-start gap-4">
                             <div className="p-3 bg-red-100 rounded-xl text-red-600">
                                <AlertTriangle size={24} />
                             </div>
                             <div className="flex-1">
                                 <h3 className="font-bold text-red-900 mb-1">Danger Zone</h3>
                                 <p className="text-sm text-red-700 mb-4">
                                     Permanently delete your account and all associated data. This action cannot be undone.
                                 </p>
                                 <button 
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                                    onClick={() => alert("This feature is disabled for safety in the demo.")}
                                >
                                     Delete Account
                                 </button>
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};