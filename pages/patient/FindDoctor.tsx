import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Filter, CalendarCheck, X, Clock } from 'lucide-react';
import { Doctor, User } from '../../types';
import { getDoctors, bookAppointment } from '../../services/mockData';
import { useNavigate } from 'react-router-dom';

export const FindDoctor: React.FC<{ user: User }> = ({ user }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('All');
  
  // Booking states
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    getDoctors().then(data => {
      setDoctors(data);
      setFilteredDoctors(data);
    });
  }, []);

  useEffect(() => {
    let result = doctors;
    if (searchTerm) {
      result = result.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (specialization !== 'All') {
      result = result.filter(d => d.specialization === specialization);
    }
    setFilteredDoctors(result);
  }, [searchTerm, specialization, doctors]);

  const handleBook = async () => {
    if (!selectedDoctor || !selectedSlot) return;
    setBookingLoading(true);
    try {
        await bookAppointment({
            patientId: user.id,
            patientName: user.name,
            doctorId: selectedDoctor.id,
            doctorName: selectedDoctor.name,
            date: new Date().toISOString().split('T')[0], // Mocking today's date
            time: selectedSlot
        });
        alert('Appointment booked successfully!');
        closeBookingModal();
        navigate('/patient/history'); // Navigate to history to see the new booking
    } catch (e) {
        alert('Error booking appointment');
    } finally {
        setBookingLoading(false);
    }
  };

  const closeBookingModal = () => {
      setSelectedDoctor(null);
      setSelectedSlot(null);
  };

  const specializations = ['All', ...Array.from(new Set(doctors.map(d => d.specialization)))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-800">Find a Specialist</h1>
            <p className="text-slate-500">Book appointments with top doctors near you</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <input 
                type="text" 
                placeholder="Search doctor name or keyword..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="w-full md:w-64 relative">
            <Filter className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
            <select 
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
            >
                {specializations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
            <div className="flex items-start gap-4 mb-4">
                <img src={doctor.avatar} alt={doctor.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                    <h3 className="font-bold text-slate-800 text-lg">{doctor.name}</h3>
                    <p className="text-teal-600 font-medium text-sm">{doctor.specialization}</p>
                    <div className="flex items-center gap-1 mt-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-slate-700">{doctor.rating}</span>
                        <span className="text-xs text-slate-400">({doctor.experience} yrs exp)</span>
                    </div>
                </div>
            </div>
            
            <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{doctor.bio}</p>
            
            <div className="flex items-center justify-between text-sm text-slate-600 mb-6 bg-slate-50 p-3 rounded-lg">
                <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {doctor.location}
                </div>
                <div className="font-bold text-slate-800">${doctor.fee}</div>
            </div>

            <button 
                onClick={() => setSelectedDoctor(doctor)}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20"
            >
                <CalendarCheck size={18} /> Book Appointment
            </button>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
          <div className="text-center py-20">
              <p className="text-slate-400">No doctors found matching your criteria.</p>
          </div>
      )}

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative transform transition-all scale-100 shadow-2xl">
                <button 
                    onClick={closeBookingModal}
                    className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={24} />
                </button>
                
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Book Appointment</h2>
                <p className="text-slate-500 mb-6">Select a time slot for <span className="font-semibold text-slate-800">{selectedDoctor.name}</span></p>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                         <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Clock size={16} className="text-teal-600" />
                            Available Slots (Today)
                         </h3>
                         {selectedSlot && (
                             <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full border border-teal-100">
                                Selected: {selectedSlot}
                             </span>
                         )}
                    </div>
                   
                    <div className="grid grid-cols-3 gap-3">
                        {selectedDoctor.availableSlots.map(slot => (
                            <button 
                                key={slot}
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200
                                    ${selectedSlot === slot 
                                        ? 'bg-teal-600 border-teal-600 text-white shadow-md transform scale-105' 
                                        : 'border-slate-200 text-slate-600 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50'}
                                `}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                    <button 
                        onClick={closeBookingModal} 
                        className="flex-1 py-3 px-4 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleBook}
                        disabled={!selectedSlot || bookingLoading}
                        className="flex-1 py-3 px-4 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {bookingLoading ? (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>Confirm Booking <CalendarCheck size={18} /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};