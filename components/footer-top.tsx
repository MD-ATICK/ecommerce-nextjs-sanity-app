import { LocationEdit, Mail, Phone, Timer } from "lucide-react";
import React from "react";

type contactType = {
	title: string;
	subtitle: string;
	icon: React.ReactNode;
};

export default function FooterTop() {
	const contact: contactType[] = [
		{
			title: "Visit Us",
			subtitle: "Dhaka, Bangladesh",
			icon: <LocationEdit />,
		},
		{
			title: "Call Us",
			subtitle: "+12-985-985-952",
			icon: <Phone />,
		},
		{
			title: "Working Hours",
			subtitle: "Dhaka, Bangladesh",
			icon: <Timer />,
		},
		{
			title: "Email Us",
			subtitle: "Dhaka, Bangladesh",
			icon: <Mail />,
		},
	];

	return (
		<div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4   border-y'>
			{contact.map((item, index) => (
				<ContactItem key={index} {...item} />
			))}
		</div>
	);
}

const ContactItem = ({ title, subtitle, icon }: contactType) => {
	return (
		<div className=' flex items-center gap-3 p-3 hover:bg-foreground/10 transition-all duration-150 ease-in-out'>
			{icon}
			<div>
				<p className=' text-sm font-medium'>{title}</p>
				<p className=' text-xs text-muted-foreground'>{subtitle}</p>
			</div>
		</div>
	);
};
