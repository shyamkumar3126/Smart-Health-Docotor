import React, { useState, useEffect } from 'react';
import { Search, FlaskConical, Home, Info, MessageCircle } from 'lucide-react';
import { LabTest } from '../../types';
import { getLabTests } from '../../services/mockData';

export const LabTests: React.FC = () => {
    const [tests, setTests] = useState<LabTest[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getLabTests().then(setTests);
    }, []);

    const filteredTests = tests.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full">
            <div className="flex-1 space-y-6">
                <div>
                     <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                         <span className="text-purple-600" style={{ textShadow: '0 0 20px rgba(192, 132, 252, 0.5)' }}>Lab Test Booking</span>
                     </h1>
                </div>

                 <div className="relative">
                    <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search lab tests..." 
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {filteredTests.map(test => (
                        <div key={test.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-purple-200 transition">
                            <h3 className="font-bold text-slate-800 mb-1">{test.name}</h3>
                            <p className="text-xs text-slate-500 mb-2">{test.description}</p>
                            
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-bold text-purple-700">₹{test.price}</span>
                                <span className="text-xs text-slate-400">{test.category}</span>
                            </div>

                            {test.homePickup && (
                                <div className="flex items-center gap-1 text-xs text-orange-600 mb-4">
                                    <Home size={14} /> Home pickup available
                                </div>
                            )}

                            <button className="w-full py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors">
                                Select Test
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sidebar Summary */}
            <div className="w-full lg:w-96 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
                <h3 className="font-bold text-lg text-slate-800 mb-4">Booking Summary</h3>
                <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50">
                    <p>No tests selected</p>
                </div>
            </div>
             {/* Floating Chat Button mockup to match layout if needed, though Global AI Chat exists */}
        </div>
    );
};