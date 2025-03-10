"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import Image from "next/image";
import {
	FaArrowLeft,
	FaStar,
	FaVideo,
	FaUserMd,
	FaClock,
	FaCalendar,
	FaLanguage,
	FaMoneyBillWave,
} from "react-icons/fa";
import { Doctor } from "@/types/doctor";
import { useDoctorStore } from "@/lib/stores/doctorStore";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
	"09:00 AM",
	"09:30 AM",
	"10:00 AM",
	"10:30 AM",
	"11:00 AM",
	"11:30 AM",
	"02:00 PM",
	"02:30 PM",
	"03:00 PM",
	"03:30 PM",
	"04:00 PM",
	"04:30 PM",
];

function AppointmentContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [doctor, setDoctor] = useState<Doctor | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		patientName: "",
		email: "",
		phone: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const { bookAppointment } = useDoctorStore();

	useEffect(() => {
		try {
			const doctorData = JSON.parse(
				decodeURIComponent(searchParams.get("doctor") || "")
			);
			setDoctor(doctorData);
		} catch (error) {
			toast.error("Error loading doctor information");
			router.push("/doctors");
		}
	}, [searchParams, router]);

	const handleDateSelect = (date: Date | undefined) => {
		if (!date) return;

		const selectedDate = new Date(date);
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (selectedDate < today) {
			toast.error("Please select a future date");
			return;
		}

		setSelectedDate(selectedDate);
		setSelectedTime(null);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleConfirmBooking = async () => {
		if (!doctor || !selectedDate || !selectedTime) {
			toast.error("Please select both date and time");
			return;
		}

		if (!formData.patientName || !formData.email || !formData.phone) {
			toast.error("Please fill in all patient information");
			return;
		}

		setIsLoading(true);
		try {
			await bookAppointment({
				doctorId: doctor.id.toString(),
				date: format(selectedDate, "yyyy-MM-dd"),
				time: selectedTime,
				patientName: formData.patientName,
				email: formData.email,
				phone: formData.phone,
				specialty: doctor.specialty,
			});

			toast.success("Appointment booked successfully!");
			router.push("/doctors");
		} catch (error) {
			toast.error("Failed to book appointment");
		} finally {
			setIsLoading(false);
		}
	};

	if (!doctor) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
						Doctor not found
					</h2>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Please try again
					</p>
					<Button
						onClick={() => router.push("/doctors")}
						className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
						Back to Doctors
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<button
						onClick={() => router.push("/doctors")}
						className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
						<FaArrowLeft className="mr-2" />
						Back to Doctors
					</button>
				</div>

				<div className="max-w-5xl mx-auto">
					{/* Doctor Profile Card */}
					<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
						<div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
							<div className="flex-shrink-0">
								{doctor.image ? (
									<img
										src={doctor.image}
										alt={`${doctor.name}`}
										className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
									/>
								) : (
									<div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
										<FaUserMd className="w-12 h-12 text-blue-600 dark:text-blue-400" />
									</div>
								)}
							</div>

							<div className="flex-grow text-center md:text-left">
								<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
									{doctor.name}
								</h1>
								<p className="text-lg text-blue-600 dark:text-blue-400 mb-3">
									{doctor.specialty}
								</p>

								<div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
									<div className="flex items-center space-x-2">
										<FaStar className="text-yellow-500" />
										<span className="text-gray-700 dark:text-gray-300">
											{doctor.rating} ({doctor.ratingCount || "0"} reviews)
										</span>
									</div>

									<div className="flex items-center space-x-2">
										<FaUserMd className="text-blue-500" />
										<span>{doctor.experience} Experience</span>
									</div>

									{doctor.languages && (
										<div className="flex items-center space-x-2">
											<FaLanguage className="text-blue-500" />
											<span>{doctor.languages}</span>
										</div>
									)}

									{doctor.price && (
										<div className="flex items-center space-x-2">
											<FaMoneyBillWave className="text-green-500" />
											<span className="font-semibold">{doctor.price}</span>
										</div>
									)}

									{doctor.isVideoConsult && (
										<div className="flex items-center space-x-2 text-green-500">
											<FaVideo />
											<span>Video Consultation Available</span>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Booking Form */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Left Column - Calendar & Time */}
						<div className="space-y-6">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
									Select Date & Time
								</h2>
								<div className="mb-6">
									<Calendar
										mode="single"
										selected={selectedDate || undefined}
										onSelect={handleDateSelect}
										disabled={(date) => date < new Date()}
										className={cn(
											"rounded-md border dark:border-gray-700",
											"dark:bg-gray-800 dark:text-gray-400",
											"p-3"
										)}
										classNames={{
											day_selected: "bg-blue-600 text-white hover:bg-blue-600",
											day_today: "bg-gray-100 dark:bg-gray-700 text-blue-600",
											day_disabled: "text-gray-400 dark:text-gray-600",
											day_range_middle: "bg-gray-100 dark:bg-gray-800",
											day_hidden: "invisible",
											nav_button_previous: "text-gray-600 dark:text-gray-400",
											nav_button_next: "text-gray-600 dark:text-gray-400",
											caption: "text-gray-900 dark:text-gray-100 font-semibold",
										}}
									/>
								</div>

								{/* Time Slots */}
								{selectedDate && (
									<div>
										<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
											Available Time Slots
										</h3>
										<div className="grid grid-cols-3 gap-2">
											{TIME_SLOTS.map((time) => (
												<button
													key={time}
													onClick={() => setSelectedTime(time)}
													className={`py-2 px-3 text-sm rounded-lg transition-all duration-200 ${
														selectedTime === time
															? "bg-blue-600 text-white shadow-md"
															: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
													}`}>
													{time}
												</button>
											))}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Right Column - Patient Information */}
						<div className="space-y-6">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
									Patient Information
								</h2>
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
											Full Name
										</label>
										<input
											type="text"
											name="patientName"
											value={formData.patientName}
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
											placeholder="Enter your full name"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
											Email
										</label>
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
											placeholder="Enter your email"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
											Phone Number
										</label>
										<input
											type="tel"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
											placeholder="Enter your phone number"
										/>
									</div>
								</div>
							</div>

							{/* Booking Summary */}
							{selectedDate && selectedTime && (
								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
										Booking Summary
									</h3>
									<div className="space-y-3 text-gray-600 dark:text-gray-300">
										<div className="flex items-center">
											<FaCalendar className="w-5 h-5 text-blue-500 mr-3" />
											<span>{format(selectedDate, "MMMM d, yyyy")}</span>
										</div>
										<div className="flex items-center">
											<FaClock className="w-5 h-5 text-blue-500 mr-3" />
											<span>{selectedTime}</span>
										</div>
									</div>
								</div>
							)}

							{/* Action Buttons */}
							<div className="flex justify-end space-x-4">
								<Button
									variant="outline"
									onClick={() => router.push("/doctors")}
									className="px-6">
									Cancel
								</Button>
								<Button
									onClick={handleConfirmBooking}
									disabled={
										!selectedDate ||
										!selectedTime ||
										!formData.patientName ||
										!formData.email ||
										!formData.phone ||
										isLoading
									}
									className="px-6 bg-blue-600 hover:bg-blue-700">
									{isLoading ? (
										<>
											<svg
												className="animate-spin -ml-1 mr-3 h-5 w-5"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24">
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											Booking...
										</>
									) : (
										"Confirm Booking"
									)}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Loading component for Suspense fallback
function LoadingAppointment() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
		</div>
	);
}

export default function AppointmentPage() {
	return (
		<Suspense fallback={<LoadingAppointment />}>
			<AppointmentContent />
		</Suspense>
	);
}
