'use client';

import { useState } from 'react';
import { FaUserMd, FaMapMarkerAlt, FaPhoneAlt, FaUserNurse } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/navigation/Navbar';

const HomeHealthCare = () => {
  const [location, setLocation] = useState('Bhubaneswar');
  const [selectedService, setSelectedService] = useState('');

  const doctors = [
    { name: 'Dr. Anil Kumar', specialty: 'General Physician' },
    { name: 'Dr. Priya Sharma', specialty: 'Pediatrician' },
  ];

  const nurses = [
    { name: 'Nurse Asha', experience: '5 years' },
    { name: 'Nurse Ravi', experience: '3 years' },
  ];

  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center ">
      <Navbar/>
      <div className="max-w-4xl w-full  mt-5 p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Home Health Care</h1>
        <p className="text-gray-600 text-center mt-2">
          Professional healthcare services delivered right to your doorstep.
        </p>

        {/* Location Selector */}
        <div className="mt-6 flex items-center gap-3">
          <FaMapMarkerAlt className="text-blue-600 text-lg" />
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your city"
            className="w-full border rounded-lg p-2 text-gray-800"
          />
        </div>

        {/* Services Selection */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div
            className="flex items-center gap-4 bg-blue-50 p-4 rounded-xl shadow cursor-pointer"
            onClick={() => setSelectedService('doctors')}
          >
            <FaUserMd className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Expert Doctors</h3>
              <p className="text-sm text-gray-600">Highly qualified doctors available for home visits.</p>
            </div>
          </div>
          <div
            className="flex items-center gap-4 bg-green-50 p-4 rounded-xl shadow cursor-pointer"
            onClick={() => setSelectedService('nurses')}
          >
            <FaUserNurse className="text-green-600 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Certified Nurses</h3>
              <p className="text-sm text-gray-600">Professional nurses for personalized home care.</p>
            </div>
          </div>
        </div>

        {/* Available Personnel */}
        <div className="mt-8">
          {selectedService === 'doctors' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Doctors</h2>
              <ul className="space-y-3">
                {doctors.map((doc, index) => (
                  <li key={index} className="bg-gray-50 p-3 rounded-lg shadow">
                    <strong>{doc.name}</strong> - {doc.specialty}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedService === 'nurses' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Nurses</h2>
              <ul className="space-y-3">
                {nurses.map((nurse, index) => (
                  <li key={index} className="bg-gray-50 p-3 rounded-lg shadow">
                    <strong>{nurse.name}</strong> - {nurse.experience} experience
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Contact Button */}
        <div className="mt-8 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
            <FaPhoneAlt /> Contact Us Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeHealthCare;
