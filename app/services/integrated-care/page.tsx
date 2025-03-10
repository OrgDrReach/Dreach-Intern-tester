'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navigation/Navbar';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  image: string;
}

const demoDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Ayesha Kapoor',
    specialty: 'Cardiologist',
    location: 'Bhubaneswar',
    image: '/images/doctor1.jpg',
  },
  {
    id: 2,
    name: 'Dr. Rohan Mehta',
    specialty: 'Dermatologist',
    location: 'Bhubaneswar',
    image: '/images/doctor2.jpg',
  },
  {
    id: 3,
    name: 'Dr. Neha Sharma',
    specialty: 'Neurologist',
    location: 'Bhubaneswar',
    image: '/images/doctor3.jpg',
  },
];

export default function IntegratedCare() {
  const [location, setLocation] = useState<string>('Bhubaneswar');
  const [doctors, setDoctors] = useState<Doctor[]>(demoDoctors);

  return (
    <div className=" bg-gray-50 text-gray-900">
        <Navbar/>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg"
      >
        <h1 className="text-5xl font-extrabold">Empowering Your Healthcare Journey</h1>
        <p className="mt-4 text-lg">Find top-rated doctors in your area and get the best medical advice today.</p>
      </motion.div>

      {/* Search Section */}
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Find Integrated Care Near You</h2>
        <div className="flex gap-2 items-center mb-6 bg-white p-4 rounded-lg shadow-md">
          <Input
            type="text"
            placeholder="Enter location (City or Zip)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm"
          />
          <Button variant="outline" className="flex gap-2 items-center">
            <MapPin className="w-5 h-5" />
            Use GPS
          </Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Doctors List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
      >
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Card key={doctor.id} className="bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-300">
              <CardContent className="p-6 flex flex-col items-center">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-800">{doctor.name}</h3>
                  <p className="text-md text-gray-600">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500">{doctor.location}</p>
                  <ul className="text-sm text-gray-500 mt-2">
                    <li>Experience: 10 years</li>
                    <li>Rating: 4.5/5</li>
                    <li>Consultation Fee: $50</li>
                  </ul>
                  <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600">No doctors found. Try another location.</p>
        )}
      </motion.div>
    </div>
  );
}