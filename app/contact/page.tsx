import Image from "next/image";
import type { Metadata } from "next";
import ContactUsMain from "@/components/page-components/ContactPage/ContactUsMain";

export const metadata: Metadata = {
	title: "Dreach.in | Contact Us",
	description:
		"Get in touch with us, we are here to help. Contact Dreach.in for any query, feedback or support.",
};

export default function Contact() {
	return (
		<main className="">
			<div>
				<ContactUsMain />
			</div>
		</main>
	);
}
