import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

// Types
export interface Doctor {
  image: string | undefined;
  id: string;
  name: string;
  specialty: string;
  rating: number;
  availability: string[];
}

export interface Appointment {
  id?: string;
  doctorId: string;
  patientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  specialty: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

interface DoctorState {
  doctors: Doctor[];
  filteredDoctors: Doctor[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchDoctors: (specialty?: string) => Promise<void>;
  searchDoctors: (query: string) => void;
  bookAppointment: (appointment: Appointment) => Promise<Appointment | null>;
}

export const useDoctorStore = create<DoctorState>()(
  devtools(
    (set, get) => ({
      doctors: [],
      filteredDoctors: [],
      loading: false,
      error: null,

      fetchDoctors: async (specialty) => {
        set({ loading: true, error: null });
        try {
          // Replace with your actual API endpoint
          const response = await axios.get('/api/doctors', { 
            params: { specialty } 
          });
          set({ 
            doctors: response.data, 
            filteredDoctors: response.data,
            loading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch doctors', 
            loading: false 
          });
        }
      },

      searchDoctors: (query) => {
        const { doctors } = get();
        const filtered = doctors.filter(
          doctor => 
            doctor.name.toLowerCase().includes(query.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(query.toLowerCase())
        );
        set({ filteredDoctors: filtered });
      },

      bookAppointment: async (appointment) => {
        set({ loading: true, error: null });
        try {
          // Replace with your actual booking API endpoint
          const response = await axios.post('/api/appointments', appointment);
          set({ loading: false });
          return response.data;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to book appointment', 
            loading: false 
          });
          return null;
        }
      }
    }),
    { name: 'DoctorStore' }
  )
);
