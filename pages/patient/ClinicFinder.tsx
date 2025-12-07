import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Phone, Clock } from 'lucide-react';
import { Clinic } from '../../types';
import { getClinics } from '../../services/mockData';

export const ClinicFinder: React.FC = () => {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getClinics().then(setClinics);
    }, []);

    const filteredClinics = clinics.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-6">
            <div>
                 <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                     <span className="text-purple-600" style={{ textShadow: '0 0 20px rgba(192, 132, 252, 0.5)' }}>Clinic & Hospital Finder</span>
                 </h1>
                <p className="text-slate-500">Find nearby healthcare facilities</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search clinics/hospitals..." 
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                 <div className="w-full md:w-40 relative">
                    <Filter className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                    <select className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                        <option>All Types</option>
                        <option>Hospital</option>
                        <option>Clinic</option>
                    </select>
                </div>
                <div className="w-full md:w-40 flex items-center gap-2">
                     <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                        <option>All Ratings</option>
                        <option>4+ Stars</option>
                    </select>
                </div>
                 <div className="w-full md:w-64 px-2">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Max Distance: 10km</span>
                    </div>
                    <input type="range" className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClinics.map(clinic => (
                    <div key={clinic.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-purple-700 text-lg">{clinic.name}</h3>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${clinic.type === 'HOSPITAL' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                {clinic.type}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-4">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-slate-700">{clinic.rating}</span>
                        </div>

                        <div className="space-y-2 text-sm text-slate-600 mb-6 flex-1">
                            <div className="flex items-start gap-2">
                                <MapPin size={16} className="text-slate-400 mt-0.5" />
                                <span>{clinic.address} • <span className="text-slate-400">{clinic.distance}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-slate-400" />
                                <span>{clinic.openHours}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-slate-400" />
                                <span>{clinic.phone}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
                            {clinic.specialties.map(spec => (
                                <span key={spec} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-lg">
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};