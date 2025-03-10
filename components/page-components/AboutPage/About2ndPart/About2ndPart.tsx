import Link from "next/link";
import Image from "next/image";
import {
	FaArrowRight,
	FaUserMd,
	FaHospital,
	FaAward,
	FaCheckCircle,
} from "react-icons/fa";

export const About2ndPart = () => {
	const stats = [
		{
			icon: <FaUserMd className="text-3xl" />,
			count: "50+",
			label: "Expert Doctors",
		},
		{
			icon: <FaHospital className="text-3xl" />,
			count: "1000+",
			label: "Happy Patients",
		},
		{
			icon: <FaAward className="text-3xl" />,
			count: "15+",
			label: "Years Experience",
		},
	];

	const highlights = [
		"24/7 Virtual Medical Support",
		"Experienced Healthcare Professionals",
		"Advanced Telemedicine Platform",
		"Affordable Healthcare Solutions",
	];

	return (
		<section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="text-center mb-16">
					{/* <span className="text-[#2da3cf] dark:text-[#56d2ff] font-semibold text-lg mb-2 block">
            ABOUT DR. REACH
          </span> */}
					<h2 className="text-4xl lg:text-5xl font-bold text-[#125872] dark:text-[#56d2ff] mb-4">
						Who We Are
					</h2>
					<div className="w-24 h-1.5 bg-gradient-to-r from-[#125872] to-[#2da3cf] dark:from-[#56d2ff] dark:to-[#2da3cf] mx-auto rounded-full"></div>
				</div>

				<div className="grid lg:grid-cols-2 gap-16 items-center">
					<div className="relative group">
						<div className="absolute inset-0 bg-[#125872] transform rotate-6 rounded-2xl opacity-10 group-hover:rotate-8 transition-transform duration-300"></div>
						<div className="relative z-10 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-xl transition-transform duration-500 hover:-translate-y-2">
							<Image
								src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2000&auto=format&fit=crop"
								alt="Modern Healthcare Facility"
								width={600}
								height={400}
								className="rounded-xl object-cover w-full h-[400px]"
								priority
								unoptimized={true}
							/>
							<div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-[#125872] to-[#2da3cf] text-white p-6 rounded-2xl shadow-xl hidden lg:block transform transition-transform duration-300 hover:scale-105">
								<p className="text-3xl font-bold">10+</p>
								<p className="text-sm font-medium">Years of Excellence</p>
							</div>
						</div>
					</div>

					<div className="space-y-8">
						<div>
							<h3 className="text-3xl font-bold text-[#125872] dark:text-[#56d2ff] mb-4">
								Revolutionizing Healthcare Access
							</h3>
							<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
								Dr. Reach is on a mission to transform healthcare by making it
								simpler, faster, and more accessible for everyone, regardless of
								location. We save patients time, money, and the hassle of
								dealing with complex healthcare systems by offering a seamless
								reliable solutions.
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							{highlights.map((highlight, index) => (
								<div
									key={index}
									className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
									<FaCheckCircle className="text-[#2da3cf] dark:text-[#56d2ff] flex-shrink-0" />
									<span>{highlight}</span>
								</div>
							))}
						</div>
						<Link href="/contact" className="inline-block">
							<button className="bg-gradient-to-r from-[#125872] to-[#2da3cf] px-8 py-4 rounded-full flex items-center space-x-3 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
								<span className="text-lg">Connect With Us</span>
								<FaArrowRight className="text-lg" />
							</button>
						</Link>
						<div className="grid grid-cols-3 gap-4">
							{stats.map((stat, index) => (
								<div
									key={index}
									className="text-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
									<div className="text-[#2da3cf] dark:text-[#56d2ff] mb-2">
										{stat.icon}
									</div>
									<div className="font-bold text-2xl text-[#125872] dark:text-[#56d2ff]">
										{stat.count}
									</div>
									<div className="text-sm font-medium text-gray-600 dark:text-gray-400">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About2ndPart;
