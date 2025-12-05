import { User, Doctor, Appointment, UserRole } from '../types';

// Initial Data
const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Cardiologist',
    experience: 12,
    fee: 150,
    rating: 4.8,
    location: 'New York, NY',
    bio: 'Expert in interventional cardiology with over a decade of experience.',
    availableSlots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'],
    avatar: 'https://picsum.photos/200/200?random=1'
  },
  {
    id: 'd2',
    name: 'Dr. James Chen',
    email: 'james@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Dermatologist',
    experience: 8,
    fee: 100,
    rating: 4.9,
    location: 'San Francisco, CA',
    bio: 'Specializing in cosmetic and medical dermatology.',
    availableSlots: ['11:00 AM', '01:00 PM', '04:00 PM'],
    avatar: 'https://picsum.photos/200/200?random=2'
  },
  {
    id: 'd3',
    name: 'Dr. Emily Brooks',
    email: 'emily@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Pediatrician',
    experience: 15,
    fee: 120,
    rating: 4.7,
    location: 'Chicago, IL',
    bio: 'Compassionate care for children of all ages.',
    availableSlots: ['08:30 AM', '09:30 AM', '10:30 AM'],
    avatar: 'https://picsum.photos/200/200?random=3'
  }
];

const INITIAL_PATIENTS: User[] = [
    { id: 'p1', name: 'John Doe', email: 'john@gmail.com', role: UserRole.PATIENT, avatar: 'https://picsum.photos/200/200?random=4' },
    { id: 'p2', name: 'Alice Smith', email: 'alice@example.com', role: UserRole.PATIENT, avatar: 'https://picsum.photos/200/200?random=5' },
    { id: 'p3', name: 'Robert Johnson', email: 'robert@test.com', role: UserRole.PATIENT, avatar: 'https://picsum.photos/200/200?random=6' },
];

const ADMIN_USER: User = { id: 'admin1', name: 'Admin User', email: 'admin@mediconnect.com', role: UserRole.ADMIN, avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0d9488&color=fff' };

// In-memory store for the session
let MOCK_USERS: User[] = [...INITIAL_DOCTORS, ...INITIAL_PATIENTS, ADMIN_USER];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'John Doe',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Wilson',
    date: new Date().toISOString().split('T')[0],
    time: '09:00 AM',
    status: 'CONFIRMED'
  }
];

// Helper to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Auth Services ---

export const loginUser = async (email: string, role: UserRole): Promise<User> => {
  await delay(800);
  
  // Find user in our mock DB
  const user = MOCK_USERS.find(u => u.email === email && u.role === role);
  
  if (user) return user;

  // Fallback for demo login if specific email not matched but role is valid
  if (role === UserRole.DOCTOR) return INITIAL_DOCTORS[0];
  if (role === UserRole.ADMIN) return ADMIN_USER;
  return INITIAL_PATIENTS[0];
};

export const registerUser = async (data: any): Promise<User> => {
    await delay(1000);
    const newUser = {
        id: `u_${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        email: data.email,
        role: data.role,
        avatar: `https://ui-avatars.com/api/?name=${data.name}&background=random`
    };
    MOCK_USERS.push(newUser);
    return newUser;
};

// --- Data Services ---

export const getDoctors = async (): Promise<Doctor[]> => {
    await delay(500);
    return MOCK_USERS.filter(u => u.role === UserRole.DOCTOR) as Doctor[];
};

export const getAllUsers = async (): Promise<User[]> => {
    await delay(600);
    return [...MOCK_USERS];
};

export const deleteUser = async (id: string): Promise<void> => {
    await delay(400);
    MOCK_USERS = MOCK_USERS.filter(u => u.id !== id);
};

export const updateUser = async (updatedUser: User): Promise<User> => {
    await delay(500);
    const index = MOCK_USERS.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
        MOCK_USERS[index] = { ...MOCK_USERS[index], ...updatedUser };
        return MOCK_USERS[index];
    }
    return updatedUser;
};

export const getAppointments = async (userId: string, role: UserRole): Promise<Appointment[]> => {
    await delay(500);
    const storedApps = localStorage.getItem('appointments');
    const apps: Appointment[] = storedApps ? JSON.parse(storedApps) : INITIAL_APPOINTMENTS;

    if (role === UserRole.PATIENT) {
        return apps.filter(a => a.patientId === userId);
    } else if (role === UserRole.DOCTOR) {
        return apps.filter(a => a.doctorId === userId);
    } else {
        return apps; // Admin sees all
    }
};

export const bookAppointment = async (appointment: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> => {
    await delay(1000);
    const newApp: Appointment = {
        ...appointment,
        id: `apt_${Math.random().toString(36).substr(2, 9)}`,
        status: 'PENDING'
    };
    
    const storedApps = localStorage.getItem('appointments');
    const apps: Appointment[] = storedApps ? JSON.parse(storedApps) : INITIAL_APPOINTMENTS;
    const updatedApps = [...apps, newApp];
    localStorage.setItem('appointments', JSON.stringify(updatedApps));
    
    return newApp;
};

export const updateAppointmentStatus = async (id: string, status: Appointment['status']): Promise<void> => {
    await delay(500);
    const storedApps = localStorage.getItem('appointments');
    const apps: Appointment[] = storedApps ? JSON.parse(storedApps) : INITIAL_APPOINTMENTS;
    
    const updatedApps = apps.map(a => a.id === id ? { ...a, status } : a);
    localStorage.setItem('appointments', JSON.stringify(updatedApps));
};