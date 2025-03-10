// Doctor type definition
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  ratingCount: number;
  image: string;
  isVideoConsult: boolean;
  languages: string;
  price: string;
  nextAvailable: string;
  gender: 'Male' | 'Female';
}
