import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Doctor, doctors } from "@/data/doctorData";
import { FaExclamationCircle } from "react-icons/fa";

interface DoctorCardProps extends Doctor {}

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  specialization,
  experience,
  degrees,
  qualifications,
  languages,
  clinic,
  city,
  atClinicFee,
  onlineFee,
  rating,
  totalRatings,
  availableTime,
  profileImage,
  availableDays,
}) => {
  return (
    <div className="group w-full max-w-4xl mx-auto p-5 rounded-[1.5rem] bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(76,192,244,0.08)]">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="lg:w-72 flex flex-col gap-4">
          {/* Profile Image */}
          <div className="relative mx-auto lg:mx-0 p-3 border border-gray-100 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50">
            <div className="absolute inset-0 bg-gradient-to-b from-[#4cc0f4]/10 to-[#125872]/10 rounded-2xl blur-xl scale-95 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative w-36 h-44 lg:w-full lg:h-64 rounded-xl overflow-hidden ring-1 ring-[#4cc0f4]/20 dark:ring-[#4cc0f4]/30 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#4cc0f4]/50 group-hover:shadow-lg">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={profileImage}
                alt={name}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Status Badge */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Available Today
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="border border-gray-100 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              {[
                { value: experience, label: "Years" },
                { value: totalRatings, label: "Patients" },
                { value: `${rating}%`, label: "Rating" },
              ].map((stat, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className="text-lg font-bold text-[#125872] dark:text-[#4cc0f4]">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Doctor Info */}
          <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {name}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-[#4cc0f4] font-semibold">
                {specialization}
              </span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                {degrees}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: "🏥", label: "Clinic", value: `${clinic}, ${city}` },
              { icon: "🗣️", label: "Languages", value: languages.join(", ") },
              { icon: "⏰", label: "Available", value: availableTime },
              { icon: "📚", label: "Qualification", value: qualifications },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 hover:border-[#4cc0f4]/30 transition-colors duration-300">
                <span className="text-xl">{item.icon}</span>
                <div className="min-w-0">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.label}
                  </div>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fees Section */}
          <div className="border border-gray-100 dark:border-gray-800 rounded-xl">
            <div className="flex items-center gap-4 p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl">
              {[
                { label: "At Clinic", value: atClinicFee },
                { label: "Video Consult", value: onlineFee },
              ].map((fee, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />
                  )}
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {fee.label}
                    </div>
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{fee.value}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-1 p-3 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
            <button className="flex-1 px-6 py-2.5 bg-[#4cc0f4] hover:bg-[#4cc0f4]/90 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#4cc0f4]/20 active:scale-[0.98]">
              Call Now
            </button>
            <Link
              href={{
                pathname: "/appointment",
                query: {
                  doctor: JSON.stringify({
                    name,
                    specialization,
                    experience,
                    degrees,
                    qualifications,
                    languages,
                    clinic,
                    city,
                    atClinicFee,
                    onlineFee,
                    rating,
                    totalRatings,
                    availableTime,
                    profileImage,
                    availableDays,
                  }),
                },
              }}
              className="flex-1">
              <button className="w-full px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98]">
                Book Appointment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DoctorListProps {
  searchQuery?: string;
  locationQuery?: string;
  filters?: {
    availableToday: boolean;
    nextThreeDays: boolean;
    femaleDoctors: boolean;
    maleDoctors: boolean;
    videoConsult: boolean;
  };
  isLoading?: boolean; // Add this prop
  error?: string; // Add this prop
}

const DoctorList: React.FC<DoctorListProps> = ({
  searchQuery = "",
  locationQuery = "",
  filters = {
    availableToday: false,
    nextThreeDays: false,
    femaleDoctors: false,
    maleDoctors: false,
    videoConsult: false,
  },
  isLoading = false, // Add default value
  error,
}) => {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);

  useEffect(() => {
    let filtered = [...doctors];

    const applySearchFilters = () => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter((doctor) => {
          const searchableFields = [
            doctor.name,
            doctor.specialization,
            doctor.qualifications,
            doctor.degrees,
            doctor.languages.join(" "),
            doctor.clinic,
          ].map((field) => field.toLowerCase());

          return searchableFields.some((field) => field.includes(query));
        });
      }
    };

    const applyLocationFilters = () => {
      if (locationQuery) {
        const locationParts = locationQuery
          .toLowerCase()
          .split(",")
          .map((part) => part.trim());

        filtered = filtered.filter((doctor) => {
          // Create an array of doctor location fields for matching
          const doctorLocation = [
            doctor.city,
            doctor.state,
            doctor.country,
            doctor.clinic,
          ].map((field) => field?.toLowerCase().trim());

          // Check if any part of the search query matches any part of the doctor's location
          return locationParts.some((searchPart) =>
            doctorLocation.some((docLocation) =>
              docLocation?.includes(searchPart)
            )
          );
        });
      }
    };

    const applyAvailabilityFilters = () => {
      if (filters.availableToday || filters.nextThreeDays) {
        const today = new Date();
        const next3Days = Array.from({ length: 3 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          return date.toLocaleDateString("en-US", { weekday: "long" });
        });

        filtered = filtered.filter((doctor) => {
          if (filters.availableToday) {
            return doctor.availableDays.includes(
              today.toLocaleDateString("en-US", { weekday: "long" })
            );
          }
          if (filters.nextThreeDays) {
            return doctor.availableDays.some((day) => next3Days.includes(day));
          }
          return true;
        });
      }
    };

    const applyGenderFilters = () => {
      if (filters.femaleDoctors || filters.maleDoctors) {
        filtered = filtered.filter((doctor) => {
          if (filters.femaleDoctors) return doctor.gender === "female";
          if (filters.maleDoctors) return doctor.gender === "male";
          return true;
        });
      }
    };

    // Apply all filters in sequence
    applySearchFilters();
    applyLocationFilters();
    applyAvailabilityFilters();
    applyGenderFilters();

    setFilteredDoctors(filtered);
  }, [searchQuery, locationQuery, filters]);

  // Group doctors by location for better organization
  const doctorsByLocation = useMemo(() => {
    return filteredDoctors.reduce((acc, doctor) => {
      const location = `${doctor.city}, ${doctor.state}`;
      if (!acc[location]) {
        acc[location] = [];
      }
      acc[location].push(doctor);
      return acc;
    }, {} as Record<string, Doctor[]>);
  }, [filteredDoctors]);

  // Add loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-8 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-[1.5rem]" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-2">
          <FaExclamationCircle className="inline-block h-8 w-8" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          {error}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Please try again later
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-8 dark:bg-gray-900">
      {Object.keys(doctorsByLocation).length > 0 ? (
        Object.entries(doctorsByLocation).map(([location, doctors]) => (
          <div key={location} className="w-full">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 px-4">
              {location} ({doctors.length} doctors)
            </h2>
            <div className="space-y-8">
              {doctors.map((doctor, index) => (
                <DoctorCard key={`${location}-${index}`} {...doctor} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            No doctors found matching your criteria
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try adjusting your search filters
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
