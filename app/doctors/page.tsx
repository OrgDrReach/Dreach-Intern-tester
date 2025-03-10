"use client";

import { useState, useEffect } from "react";
import { getUserLocation } from "@/utils/location";
import { LocationData } from "@/utils/location";
// import FAQ from "@/components/page-components/ServicePage/FAQ/FAQ";
import DocFooter from "@/components/page-components/DoctorsPage/DocFooter";
import DoctorList from "@/components/page-components/DoctorsPage/doctorCardNew";
import SearchAndFilters, {
  FilterState,
  SearchState,
} from "@/components/page-components/DoctorsPage/SearchAndFilters";
import DoctorHero from "@/components/page-components/DoctorsPage/DoctorHero";
import DoctorFeatured from "@/components/page-components/DoctorsPage/DoctorFeatured";
import ModernFAQ from "@/components/page-components/DoctorsPage/ModernFAQ";

export default function Doctors() {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [searchParams, setSearchParams] = useState({
    query: "",
    location: "",
    filters: {
      availableToday: false,
      nextThreeDays: false,
      femaleDoctors: false,
      maleDoctors: false,
      videoConsult: false,
    },
  });

  useEffect(() => {
    async function initLocation() {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
      } catch (error) {
        console.error("Failed to get user location:", error);
      }
    }

    initLocation();
  }, []);

  const handleSearch = (searchData: SearchState, filterData: FilterState) => {
    setSearchParams({
      query: searchData.query,
      location: searchData.location,
      filters: {
        availableToday: filterData.availableToday,
        nextThreeDays: filterData.nextThreeDays,
        femaleDoctors: filterData.femaleDoctors,
        maleDoctors: filterData.maleDoctors,
        videoConsult: filterData.videoConsult,
      },
    });
  };

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto">
        <DoctorHero />
        <DoctorFeatured />
        <div className="mb-8 px-4">
          <SearchAndFilters
            initialLocation={userLocation}
            onSearch={handleSearch}
            isSearching={false}
          />
        </div>
        <div className="py-8 lg:px-32 px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Available Doctors
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Find and book appointments with the right doctor
          </p>
        </div>
        <DoctorList
          searchQuery={searchParams.query}
          locationQuery={searchParams.location}
          filters={searchParams.filters}
        />
        <div className="mt-12">
          <ModernFAQ />
        </div>
        <div className="mt-8">
          <DocFooter />
        </div>
      </div>
    </main>
  );
}
