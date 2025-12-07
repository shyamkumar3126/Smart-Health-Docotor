export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Doctor extends User {
  specialization: string;
  experience: number;
  fee: number;
  rating: number;
  bio: string;
  availableSlots: string[]; // e.g., ["10:00 AM", "11:00 AM"]
  location: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string; // ISO date string
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

export interface Review {
  id: string;
  doctorId: string;
  patientId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// New Types for Modules
export interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
}

export interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  homePickup: boolean;
}

export interface Clinic {
  id: string;
  name: string;
  type: 'HOSPITAL' | 'CLINIC';
  rating: number;
  address: string;
  distance: string;
  image?: string;
  specialties: string[];
  openHours: string;
  phone: string;
}