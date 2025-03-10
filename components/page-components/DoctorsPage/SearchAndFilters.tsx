"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStethoscope,
  FaTimes,
  FaVideo,
  FaUserMd,
  FaUserNurse,
} from "react-icons/fa";
import { debounce } from "lodash";
import { getUserLocation, LocationData } from "@/utils/location";
import { toast } from "sonner";
import { doctors } from "@/data/doctorData";

// Improved TypeScript interfaces
export interface SearchState {
  query: string;
  location: string;
}

export interface FilterState {
  availableToday: boolean;
  nextThreeDays: boolean;
  femaleDoctors: boolean;
  maleDoctors: boolean;
  videoConsult: boolean;
}

type TabType = "all" | "online" | "clinic";

// Extracted filter configurations for better maintainability
const FILTER_CONFIG = [
  {
    key: "availableToday",
    label: "Available Today",
    icon: FaStethoscope,
    iconColor: "text-blue-500",
  },
  {
    key: "nextThreeDays",
    label: "Next 3 Days",
    icon: FaCalendarAlt,
    iconColor: "text-green-500",
  },
  {
    key: "femaleDoctors",
    label: "Female Doctors",
    icon: FaUserNurse,
    iconColor: "text-purple-500",
  },
  {
    key: "maleDoctors",
    label: "Male Doctors",
    icon: FaUserMd,
    iconColor: "text-indigo-500",
  },
  {
    key: "videoConsult",
    label: "Video Consult",
    icon: FaVideo,
    iconColor: "text-teal-500",
  },
] as const;

interface SearchAndFiltersProps {
  initialLocation?: LocationData | null;
  onSearch: (
    searchData: { query: string; location: string },
    filterData: {
      availableToday: boolean;
      nextThreeDays: boolean;
      femaleDoctors: boolean;
      maleDoctors: boolean;
      videoConsult: boolean;
    }
  ) => void;
  isSearching: boolean; // Add this prop
}

const DEBOUNCE_DELAY = 500;

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  initialLocation,
  onSearch,
  isSearching, // Add this prop
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [search, setSearch] = useState<SearchState>({
    query: "",
    location: "",
  });
  const [filters, setFilters] = useState<FilterState>({
    availableToday: false,
    nextThreeDays: false,
    femaleDoctors: false,
    maleDoctors: false,
    videoConsult: false,
  });
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchData: SearchState, filterData: FilterState) => {
        try {
          await onSearch(searchData, filterData);
        } catch (error) {
          toast.error("Search failed. Please try again.");
        }
      }, DEBOUNCE_DELAY),
    [onSearch] // Add onSearch to dependencies
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSearch((prev) => ({ ...prev, [name]: value }));
      debouncedSearch({ ...search, [name]: value }, filters);
    },
    [search, filters, debouncedSearch]
  );

  const toggleFilter = useCallback(
    (filterKey: keyof FilterState) => {
      setFilters((prev) => {
        const newFilters = {
          ...prev,
          [filterKey]: !prev[filterKey],
        };
        debouncedSearch(search, newFilters);
        return newFilters;
      });
    },
    [search, debouncedSearch]
  );

  const resetFilters = useCallback(() => {
    const resetState = {
      availableToday: false,
      nextThreeDays: false,
      femaleDoctors: false,
      maleDoctors: false,
      videoConsult: false,
    };
    setFilters(resetState);
    debouncedSearch(search, resetState);
  }, [search, debouncedSearch]);

  useEffect(() => {
    let isMounted = true;

    async function fetchLocation() {
      try {
        setIsLoadingLocation(true);
        const locationData = await getUserLocation();

        if (isMounted && locationData) {
          const parts = [
            locationData.city,
            locationData.state,
            locationData.country,
          ].filter(Boolean);

          setSearch((prev) => ({
            ...prev,
            location: parts.join(", "),
          }));

          setUserLocation({
            lat: locationData.latitude,
            lng: locationData.longitude,
          });
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        if (isMounted) {
          setSearch((prev) => ({
            ...prev,
            location: "Mumbai, Maharashtra", // Default location
          }));
        }
      } finally {
        if (isMounted) {
          setIsLoadingLocation(false);
        }
      }
    }

    fetchLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  // Add location search suggestions
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Add this function to handle location input
  const handleLocationInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearch((prev) => ({ ...prev, location: value }));

      // Get unique locations from doctors data
      const locations = Array.from(
        new Set(
          doctors.map((doc) =>
            [doc.city, doc.state, doc.country].filter(Boolean).join(", ")
          )
        )
      );

      // Filter suggestions based on input
      const suggestions = locations
        .filter((loc) => loc.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5); // Limit to 5 suggestions

      setLocationSuggestions(suggestions);
      setShowSuggestions(value.length > 0);

      // Trigger search
      debouncedSearch({ ...search, location: value }, filters);
    },
    [search, filters, debouncedSearch]
  );

  // Add this component for location suggestions
  const LocationSuggestions: React.FC<{ suggestions: string[] }> = ({
    suggestions,
  }) => {
    if (!showSuggestions || suggestions.length === 0) return null;

    return (
      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-xl last:rounded-b-xl"
            onClick={() => {
              setSearch((prev) => ({ ...prev, location: suggestion }));
              setShowSuggestions(false);
              debouncedSearch({ ...search, location: suggestion }, filters);
            }}>
            <div className="flex items-center">
              <FaMapMarkerAlt className="h-4 w-4 text-gray-400 mr-2" />
              <span>{suggestion}</span>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl mt-5 shadow-xl p-4 md:p-6 max-w-7xl mx-auto">
      {/* Search Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "online", "clinic"].map((tab) => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab as TabType)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
              activeTab === tab
                ? "bg-primary-blue/10 text-primary-blue shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}>
            {tab} Doctors
          </motion.button>
        ))}
      </div>

      {/* Search Form */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Doctor/Specialty Search */}
        <div className="sm:col-span-2 relative">
          <SearchInput
            icon={<FaSearch className="h-5 w-5 text-gray-400" />}
            name="query"
            value={search.query}
            onChange={handleSearchChange}
            placeholder="Search doctors, specialties, symptoms..."
          />
        </div>

        {/* Location */}
        <div className="relative">
          <SearchInput
            icon={
              isLoadingLocation ? (
                <div className="animate-spin">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
              ) : (
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
              )
            }
            name="location"
            value={search.location}
            onChange={handleLocationInput}
            placeholder={
              isLoadingLocation ? "Detecting location..." : "Enter location"
            }
            disabled={isLoadingLocation}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <LocationSuggestions suggestions={locationSuggestions} />
        </div>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          disabled={isSearching}
          className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 shadow-md hover:shadow-lg">
          <FaSearch className="h-5 w-5" />
          <span>{isSearching ? "Searching..." : "Search"}</span>
        </motion.button>
      </div>

      {/* Quick Filters */}
      <div className="mt-6">
        <AnimatePresence>
          <motion.div className="flex flex-wrap gap-3 items-center">
            {FILTER_CONFIG.map(({ key, label, icon: Icon, iconColor }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => toggleFilter(key as keyof FilterState)}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filters[key as keyof FilterState]
                    ? "bg-primary-blue/10 text-primary-blue shadow-sm"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}>
                {Icon && <Icon className={`mr-2 h-4 w-4 ${iconColor}`} />}
                {label}
              </motion.button>
            ))}

            {Object.values(filters).some(Boolean) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center px-3 py-2 rounded-full bg-red-100 text-red-600 text-sm font-medium hover:bg-red-200 transition-all duration-200">
                <FaTimes className="mr-1 h-4 w-4" />
                Clear Filters
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Extracted reusable SearchInput component
const SearchInput: React.FC<{
  icon: React.ReactNode;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}> = ({
  icon,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  onFocus,
  onBlur,
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={`block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-blue dark:focus:ring-primary-blue focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 ${
        disabled ? "cursor-wait opacity-75" : ""
      }`}
    />
  </div>
);

export default SearchAndFilters;
