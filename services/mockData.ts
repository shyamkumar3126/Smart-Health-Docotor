import { User, Doctor, Appointment, UserRole, Medicine, LabTest, Clinic } from '../types';

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
  }
];

const INITIAL_PATIENTS: User[] = [
    { id: 'p1', name: 'Rahul Khanna', email: 'rahul@gmail.com', role: UserRole.PATIENT, avatar: 'https://ui-avatars.com/api/?name=Rahul+Khanna&background=random' },
    { id: 'p2', name: 'Pooja Verma', email: 'pooja@example.com', role: UserRole.PATIENT, avatar: 'https://ui-avatars.com/api/?name=Pooja+Verma&background=random' },
    { id: 'p3', name: 'Amitabh Singh', email: 'amitabh@test.com', role: UserRole.PATIENT, avatar: 'https://ui-avatars.com/api/?name=Amitabh+Singh&background=random' },
];

const ADMIN_USER: User = { id: 'admin1', name: 'System Admin', email: 'admin@mediconnect.com', role: UserRole.ADMIN, avatar: 'https://ui-avatars.com/api/?name=System+Admin&background=1e293b&color=fff' };

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

// --- New Mock Data ---

const MOCK_MEDICINES: Medicine[] = [
    { id: 'm1', name: 'Paracetamol', category: 'Pain Relief', price: 50, description: 'Pain reliever and fever reducer' },
    { id: 'm2', name: 'Amoxicillin', category: 'Antibiotics', price: 120, description: 'Antibiotic for bacterial infections' },
    { id: 'm3', name: 'Ibuprofen', category: 'Pain Relief', price: 80, description: 'Anti-inflammatory painkiller' },
    { id: 'm4', name: 'Vitamin D3', category: 'Supplements', price: 200, description: 'Supplement for bone health' },
    { id: 'm5', name: 'Omeprazole', category: 'Digestive Health', price: 150, description: 'For acid reflux and ulcers' },
    { id: 'm6', name: 'Cetirizine', category: 'Allergy', price: 40, description: 'Relief from allergy symptoms' },
];

const MOCK_LAB_TESTS: LabTest[] = [
    { id: 'l1', name: 'Complete Blood Count (CBC)', category: 'Blood Tests', price: 500, description: 'Comprehensive blood test', homePickup: true },
    { id: 'l2', name: 'Lipid Profile', category: 'Cardiac Tests', price: 800, description: 'Cholesterol and lipid levels', homePickup: true },
    { id: 'l3', name: 'Thyroid Function Test', category: 'Hormone Tests', price: 600, description: 'TSH, T3, T4 levels', homePickup: true },
    { id: 'l4', name: 'Blood Sugar Test', category: 'Diabetes Tests', price: 300, description: 'Fasting glucose levels', homePickup: true },
    { id: 'l5', name: 'X-Ray Chest', category: 'Imaging', price: 1000, description: 'Chest X-ray for respiratory issues', homePickup: false },
    { id: 'l6', name: 'MRI Scan', category: 'Imaging', price: 5000, description: 'Detailed imaging of body structures', homePickup: false },
];

const MOCK_CLINICS: Clinic[] = [
    { 
        id: 'c1', name: 'City General Hospital', type: 'HOSPITAL', rating: 4.8, 
        address: 'Mumbai Central', distance: '2.5km away', 
        phone: '+91 9876543210', specialties: ['Cardiology', 'Neurology', 'Orthopedics'], openHours: '24/7'
    },
    { 
        id: 'c2', name: 'Delhi Skin Care Clinic', type: 'CLINIC', rating: 4.6, 
        address: 'Connaught Place, Delhi', distance: '1.8km away', 
        phone: '+91 9876543211', specialties: ['Dermatology'], openHours: '9 AM - 8 PM'
    },
    { 
        id: 'c3', name: 'Bangalore Children\'s Hospital', type: 'HOSPITAL', rating: 4.9, 
        address: 'Jayanagar, Bangalore', distance: '3.2km away', 
        phone: '+91 9876543212', specialties: ['Pediatrics', 'Neonatology'], openHours: '24/7'
    },
    { 
        id: 'c4', name: 'Sunrise Dental Care', type: 'CLINIC', rating: 4.5, 
        address: 'Koramangala, Bangalore', distance: '5.0km away', 
        phone: '+91 9876543213', specialties: ['Dentistry', 'Orthodontics'], openHours: '10 AM - 9 PM'
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Auth Services ---

export const loginUser = async (email: string, role: UserRole): Promise<User> => {
  await delay(800);
  const user = MOCK_USERS.find(u => u.email === email && u.role === role);
  if (user) return user;
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
    console.log("Settings saved:", settings);
    return;
};

// --- New Getters ---
export const getMedicines = async (): Promise<Medicine[]> => {
    await delay(500);
    return MOCK_MEDICINES;
};

export const getLabTests = async (): Promise<LabTest[]> => {
    await delay(500);
    return MOCK_LAB_TESTS;
};

export const getClinics = async (): Promise<Clinic[]> => {
    await delay(500);
    return MOCK_CLINICS;
};