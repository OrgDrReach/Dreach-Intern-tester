export interface Doctor {
  id: string | number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  availability: {
    days?: string[];
    hours?: string[];
    // Add other availability fields as needed
  };
  // Add other doctor fields as needed
}

export interface DoctorsCardProps {
  name: string;
  speciality: string;
  experience: string;
  location: string;
  clinicName: string;
  availability: string;
  consultationFee: string;
  discountFee: string;
  rating: number;
  patientStories: number;
  image: string; 

}

export interface Slot {
  time: string;
  available: boolean;
}
