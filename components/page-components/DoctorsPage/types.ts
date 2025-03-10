export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  availability: string[];
}

export interface DummyDoctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  availability: string[];
}

export interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor?: Doctor;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
}

export interface FormField {
  icon: React.ComponentType;
  placeholder: string;
  field: keyof BookingFormData;
  type?: string;
} 