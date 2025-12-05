import { User, Doctor, Appointment, UserRole } from '../types';

// Initial Data
const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Aarav Patel',
    email: 'aarav.patel@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Cardiologist',
    experience: 18,
    fee: 1500,
    rating: 4.9,
    location: 'Mumbai, MH',
    bio: 'Senior Interventional Cardiologist with expertise in complex angioplasties and heart failure management. Formerly at AIIMS.',
    availableSlots: ['10:00 AM', '11:30 AM', '04:00 PM', '06:00 PM'],
    avatar: 'https://ui-avatars.com/api/?name=Aarav+Patel&background=0D9488&color=fff'
  },
  {
    id: 'd2',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Dermatologist',
    experience: 10,
    fee: 800,
    rating: 4.8,
    location: 'New Delhi, DL',
    bio: 'Cosmetic dermatologist specializing in laser treatments, acne management, and anti-aging therapies.',
    availableSlots: ['09:00 AM', '10:00 AM', '02:00 PM'],
    avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=E11D48&color=fff'
  },
  {
    id: 'd3',
    name: 'Dr. Rajesh Iyer',
    email: 'rajesh.iyer@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Neurologist',
    experience: 22,
    fee: 2000,
    rating: 4.9,
    location: 'Bangalore, KA',
    bio: 'Expert in stroke management, epilepsy, and movement disorders with over two decades of clinical experience.',
    availableSlots: ['11:00 AM', '01:00 PM', '05:00 PM'],
    avatar: 'https://ui-avatars.com/api/?name=Rajesh+Iyer&background=4F46E5&color=fff'
  },
  {
    id: 'd4',
    name: 'Dr. Sneha Gupta',
    email: 'sneha.gupta@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Pediatrician',
    experience: 12,
    fee: 700,
    rating: 4.7,
    location: 'Pune, MH',
    bio: 'Compassionate child specialist focusing on newborn care, vaccination, and adolescent health.',
    availableSlots: ['09:30 AM', '12:00 PM', '04:30 PM'],
    avatar: 'https://ui-avatars.com/api/?name=Sneha+Gupta&background=9333EA&color=fff'
  },
  {
    id: 'd5',
    name: 'Dr. Vikram Singh',
    email: 'vikram.singh@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Orthopedic Surgeon',
    experience: 15,
    fee: 1200,
    rating: 4.6,
    location: 'Hyderabad, TS',
    bio: 'Specializes in joint replacement surgery, sports injuries, and arthroscopy.',
    availableSlots: ['08:00 AM', '02:00 PM', '03:00 PM'],
    avatar: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=D97706&color=fff'
  },
  {
    id: 'd6',
    name: 'Dr. Meera Reddy',
    email: 'meera.reddy@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Gynecologist',
    experience: 14,
    fee: 1000,
    rating: 4.8,
    location: 'Chennai, TN',
    bio: 'Expert in high-risk pregnancies, infertility treatments, and laparoscopic surgeries.',
    availableSlots: ['10:00 AM', '01:00 PM', '06:00 PM'],
    avatar: 'https://ui-avatars.com/api/?name=Meera+Reddy&background=DB2777&color=fff'
  },
  {
    id: 'd7',
    name: 'Dr. Amit Verma',
    email: 'amit.verma@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'General Physician',
    experience: 25,
    fee: 500,
    rating: 4.5,
    location: 'Kolkata, WB',
    bio: 'Family physician with extensive experience in managing diabetes, hypertension, and infectious diseases.',
    availableSlots: ['09:00 AM', '11:00 AM', '07:00 PM'],
    avatar: 'https://ui-avatars.com/api/?name=Amit+Verma&background=059669&color=fff'
  },
  {
    id: 'd8',
    name: 'Dr. Anjali Desai',
    email: 'anjali.desai@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Psychiatrist',
    experience: 9,
    fee: 1500,
    rating: 4.9,
    location: 'Mumbai, MH',
    bio: 'Mental health advocate specializing in anxiety disorders, depression, and cognitive behavioral therapy.',
    availableSlots: ['02:00 PM', '03:00 PM', '04:00 PM'],
    avatar: 'https://ui-avatars.com/api/?name=Anjali+Desai&background=7C3AED&color=fff'
  },
  {
    id: 'd9',
    name: 'Dr. Mohammed Khan',
    email: 'mohammed.khan@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'ENT Specialist',
    experience: 11,
    fee: 800,
    rating: 4.6,
    location: 'Lucknow, UP',
    bio: 'Specialist in ear, nose, and throat disorders, sinus surgeries, and hearing loss management.',
    availableSlots: ['10:30 AM', '12:30 PM', '05:30 PM'],
    avatar: 'https://ui-avatars.com/api/?name=Mohammed+Khan&background=2563EB&color=fff'
  },
  {
    id: 'd10',
    name: 'Dr. Rohan Joshi',
    email: 'rohan.joshi@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Dentist',
    experience: 7,
    fee: 400,
    rating: 4.7,
    location: 'Ahmedabad, GJ',
    bio: 'Cosmetic dentist focusing on smile makeovers, implants, and root canal treatments.',
    availableSlots: ['09:00 AM', '05:00 PM', '06:00 PM'],
    avatar: 'https://ui-avatars.com/api/?name=Rohan+Joshi&background=CA8A04&color=fff'
  },
  {
    id: 'd11',
    name: 'Dr. Kavita Nair',
    email: 'kavita.nair@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Ophthalmologist',
    experience: 16,
    fee: 900,
    rating: 4.8,
    location: 'Kochi, KL',
    bio: 'Eye surgeon specializing in cataract surgery, LASIK, and glaucoma management.',
    availableSlots: ['08:30 AM', '11:00 AM', '03:30 PM'],
    avatar: 'https://ui-avatars.com/api/?name=Kavita+Nair&background=0891B2&color=fff'
  },
  {
    id: 'd12',
    name: 'Dr. Suresh Menon',
    email: 'suresh.menon@mediconnect.com',
    role: UserRole.DOCTOR,
    specialization: 'Endocrinologist',
    experience: 20,
    fee: 1400,
    rating: 4.9,
    location: 'Thiruvananthapuram, KL',
    bio: 'Expert in diabetes management, thyroid disorders, and hormonal imbalances.',
    availableSlots: ['10:00 AM', '12:00 PM', '02:00 PM'],
    avatar: 'https://ui-avatars.com/api/?name=Suresh+Menon&background=DC2626&color=fff'
  }
];

const INITIAL_PATIENTS: User[] = [
    { id: 'p1', name: 'Rahul Khanna', email: 'rahul@gmail.com', role: UserRole.PATIENT, avatar: 'https://ui-avatars.com/api/?name=Rahul+Khanna&background=random' },
    { id: 'p2', name: 'Pooja Verma', email: 'pooja@example.com', role: UserRole.PATIENT, avatar: 'https://ui-avatars.com/api/?name=Pooja+Verma&background=random' },
    { id: 'p3', name: 'Amitabh Singh', email: 'amitabh@test.com', role: UserRole.PATIENT, avatar: 'https://ui-avatars.com/api/?name=Amitabh+Singh&background=random' },
];

const ADMIN_USER: User = { id: 'admin1', name: 'System Admin', email: 'admin@mediconnect.com', role: UserRole.ADMIN, avatar: 'https://ui-avatars.com/api/?name=System+Admin&background=1e293b&color=fff' };

// In-memory store for the session
let MOCK_USERS: User[] = [...INITIAL_DOCTORS, ...INITIAL_PATIENTS, ADMIN_USER];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'Rahul Khanna',
    doctorId: 'd1',
    doctorName: 'Dr. Aarav Patel',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
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

export const cancelAppointment = async (id: string): Promise<void> => {
    await delay(500);
    const storedApps = localStorage.getItem('appointments');
    const apps: Appointment[] = storedApps ? JSON.parse(storedApps) : INITIAL_APPOINTMENTS;
    
    const updatedApps = apps.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a);
    localStorage.setItem('appointments', JSON.stringify(updatedApps));
};

export const updateAppointmentStatus = async (id: string, status: Appointment['status']): Promise<void> => {
    await delay(500);
    const storedApps = localStorage.getItem('appointments');
    const apps: Appointment[] = storedApps ? JSON.parse(storedApps) : INITIAL_APPOINTMENTS;
    
    const updatedApps = apps.map(a => a.id === id ? { ...a, status } : a);
    localStorage.setItem('appointments', JSON.stringify(updatedApps));
};

export const updateSystemSettings = async (settings: any): Promise<void> => {
    await delay(1000);
    // In a real app, this would save to a DB
    console.log("Settings saved:", settings);
    return;
};