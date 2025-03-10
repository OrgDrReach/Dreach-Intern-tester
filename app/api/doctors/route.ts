import { NextRequest, NextResponse } from 'next/server';

// Mock doctors data
const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Emily Chen',
    specialty: 'Cardiology',
    rating: 4.8,
    availability: ['Monday 9-5', 'Wednesday 2-6', 'Friday 10-2'],
    experience: '15 years',
    languages: 'English, Mandarin',
    price: '$200',
    isVideoConsult: true,
    nextAvailable: 'Next Week',
    gender: 'Female'
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    specialty: 'Neurology',
    rating: 4.6,
    availability: ['Tuesday 10-4', 'Thursday 1-5', 'Saturday 9-1'],
    experience: '12 years',
    languages: 'English, Spanish',
    price: '$250',
    isVideoConsult: false,
    nextAvailable: 'Next Week',
    gender: 'Male'
  },
  {
    id: '3',
    name: 'Dr. Sarah Thompson',
    specialty: 'Pediatrics',
    rating: 4.9,
    availability: ['Monday 8-3', 'Wednesday 1-6', 'Friday 9-2'],
    experience: '20 years',
    languages: 'English',
    price: '$180',
    isVideoConsult: true,
    nextAvailable: 'This Week',
    gender: 'Female'
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get('specialty');

  let filteredDoctors = mockDoctors;
  if (specialty) {
    filteredDoctors = mockDoctors.filter(
      doctor => doctor.specialty.toLowerCase() === specialty.toLowerCase()
    );
  }

  return NextResponse.json(filteredDoctors);
}
