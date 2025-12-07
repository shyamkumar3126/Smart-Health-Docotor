import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Plus, Pill } from 'lucide-react';
import { Medicine } from '../../types';
import { getMedicines } from '../../services/mockData';

export const MedicineOrdering: React.FC = () => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        getMedicines().then(setMedicines);
    }, []);

    const filteredMedicines = medicines.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = () => {
        setCartCount(prev => prev + 1);
        alert("Added to cart!");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                     <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                         <span className="text-purple-600" style={{ textShadow: '0 0 20px rgba(192, 132, 252, 0.5)' }}>Medicine Ordering</span>
                     </h1>
                    <p className="text-slate-500">Order medicines online with prescription upload</p>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-purple-600/30 hover:bg-purple-700 transition">
                    <ShoppingCart size={20} /> Cart ({cartCount})
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search medicines..." 
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                 <div className="w-full md:w-48">
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                        <option>All Categories</option>
                        <option>Pain Relief</option>
                        <option>Antibiotics</option>
                        <option>Supplements</option>
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedicines.map(med => (
                    <div key={med.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg text-purple-700">{med.name}</h3>
                                <p className="text-xs text-slate-500">{med.category}</p>
                            </div>
                            <span className="font-bold text-purple-700 text-lg">${med.price}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-6">{med.description}</p>
                        <button 
                            onClick={addToCart}
                            className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
                        >
                            <Plus size={18} /> Add to Cart
                        </button>
                    </div>
                ))}
            </div>
             {filteredMedicines.length === 0 && <p className="text-center text-slate-400 py-12">No medicines found.</p>}
        </div>
    );
};