import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";

export default function Loading() {
	return (
		<div className=' animate-pulse font-medium text-muted-foreground text-sm flex items-center '>
			<Image src={logo} alt='logo' height={25} /> Loading
		</div>
	);
}
