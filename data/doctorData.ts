export interface Doctor {
	name: string;
	specialization: string;
	experience: number;
	degrees: string;
	qualifications: string;
	languages: string[];
	clinic: string;
	city: string;
	state: string;
	country: string;
	atClinicFee: number;
	onlineFee: number;
	rating: number;
	totalRatings: number;
	availableTime: string;
	profileImage: string;
	bio: string;
	availableDays: string[];
	gender: "male" | "female";
}

export const doctors: Doctor[] = [
	{
		name: "Dr. Sarah Mehta",
		specialization: "Cardiologist",
		gender: "female",
		experience: 12,
		degrees: "MBBS, MD - Cardiology",
		qualifications: "Specialist in Cardiac Surgery",
		languages: ["English", "Hindi"],
		clinic: "Heart Care Center",
		city: "Mumbai",
		state: "Maharashtra",
		country: "India",
		atClinicFee: 1000,
		onlineFee: 700,
		rating: 88,
		totalRatings: 150,
		availableTime: "02:00 PM - 05:00 PM",
		profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
		bio: "Dr. Sarah Mehta is a highly skilled cardiologist with over 12 years of experience in treating various heart conditions.",
		availableDays: ["Monday", "Wednesday", "Friday"],
	},
	{
		name: "Dr. Rajesh Sharma",
		specialization: "Neurologist",
		gender: "male",
		experience: 15,
		degrees: "MBBS, MD - Neurology",
		qualifications: "Specialist in Neurological Disorders",
		languages: ["English", "Hindi", "Gujarati"],
		clinic: "Brain & Spine Center",
		city: "Ahmedabad",
		state: "Gujarat",
		country: "India",
		atClinicFee: 1200,
		onlineFee: 800,
		rating: 92,
		totalRatings: 180,
		availableTime: "10:00 AM - 02:00 PM",
		profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
		bio: "Dr. Rajesh Sharma is a renowned neurologist specializing in complex neurological conditions.",
		availableDays: ["Tuesday", "Thursday", "Saturday"],
	},
	{
		name: "Dr. Priya Patel",
		specialization: "Dermatologist",
		gender: "female",
		experience: 10,
		degrees: "MBBS, MD - Dermatology",
		qualifications: "Specialist in Skin Disorders",
		languages: ["English", "Hindi", "Gujarati"],
		clinic: "Skin Care Center",
		city: "Surat",
		state: "Gujarat",
		country: "India",
		atClinicFee: 800,
		onlineFee: 600,
		rating: 95,
		totalRatings: 200,
		availableTime: "09:00 AM - 12:00 PM",
		profileImage: "https://randomuser.me/api/portraits/women/46.jpg",
		bio: "Dr. Priya Patel is a skilled dermatologist dedicated to treating skin conditions.",
		availableDays: ["Monday", "Wednesday", "Friday"],
	},
	{
		name: "Dr. Anil Kumar",
		specialization: "Orthopedist",
		gender: "male",
		experience: 8,
		degrees: "MBBS, MD - Orthopedics",
		qualifications: "Specialist in Joint Replacement",
		languages: ["English", "Hindi", "Odia"],
		clinic: "Joint Replacement Center",
		city: "Cuttack",
		state: "Odisha",
		country: "India",
		atClinicFee: 1500,
		onlineFee: 1000,
		rating: 90,
		totalRatings: 190,
		availableTime: "03:00 PM - 06:00 PM",
		profileImage: "https://randomuser.me/api/portraits/men/47.jpg",
		bio: "Dr. Anil Kumar is a renowned orthopedist specializing in joint replacement surgeries.",
		availableDays: ["Tuesday", "Thursday", "Saturday"],
	},
	{
		name: "Dr. Ritu Singh",
		specialization: "Gynecologist",
		gender: "female",
		experience: 12,
		degrees: "MBBS, MD - Obstetrics and Gynecology",
		qualifications: "Specialist in Gynecological Disorders",
		languages: ["English", "Hindi", "Punjabi"],
		clinic: "Gynecology Center",
		city: "Jaipur",
		state: "Rajasthan",
		country: "India",
		atClinicFee: 1100,
		onlineFee: 750,
		rating: 85,
		totalRatings: 170,
		availableTime: "08:00 AM - 11:00 AM",
		profileImage: "https://randomuser.me/api/portraits/women/48.jpg",
		bio: "Dr. Ritu Singh is a skilled gynecologist dedicated to treating gynecological conditions.",
		availableDays: ["Monday", "Wednesday", "Friday"],
	},
];
