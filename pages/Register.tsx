import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Mail, User } from 'lucide-react';

export const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-lg">
        <div className="text-center mb-8">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
                <Shield size={24} />
            </div>
          <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
          <p className="text-slate-500">Join MediConnect today</p>
        </div>

        <form className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
            <input type="text" placeholder="Full Name" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
            <input type="email" placeholder="Email Address" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
            <input type="password" placeholder="Password" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
          </div>

          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition-all">
            Sign Up
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-teal-600 hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
};