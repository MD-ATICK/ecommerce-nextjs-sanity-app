import React from "react";
import logo from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
	return (
		<Link href={"/"}>
			<Image src={logo} alt='logo' height={40} className='' />
		</Link>
	);
}
