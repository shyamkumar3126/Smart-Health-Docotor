import React from 'react';
import { Video, MessageSquare } from 'lucide-react';

export const OnlineConsult: React.FC = () => {
    return (
        <div className="space-y-6">
             <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                 <span className="text-purple-600" style={{ textShadow: '0 0 20px rgba(192, 132, 252, 0.5)' }}>Online Consultation</span>
             </h1>

            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 max-w-2xl w-full text-center">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Instant Doctor Consultation</h2>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                        Get expert medical advice from qualified doctors through chat or video consultation.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="border border-slate-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-md transition cursor-pointer bg-slate-50">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-1">Chat Consultation</h3>
                            <p className="text-xs text-slate-500 mb-3">Text-based consultation</p>
                            <span className="font-bold text-slate-900">₹500</span>
                        </div>

                         <div className="border border-slate-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-md transition cursor-pointer bg-slate-50">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Video size={24} />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-1">Video Consultation</h3>
                            <p className="text-xs text-slate-500 mb-3">Face-to-face consultation</p>
                            <span className="font-bold text-slate-900">₹1000</span>
                        </div>
                    </div>

                    <button className="bg-slate-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-700 transition shadow-lg">
                        Consult Now - ₹500
                    </button>
                </div>
            </div>
        </div>
    );
};