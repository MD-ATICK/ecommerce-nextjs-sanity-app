import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useMobileSidebar } from "../hooks/use-mobile-sidebar";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { headerData } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileSidebarSheet() {
	const { open, setOpen } = useMobileSidebar();
	const pathName = usePathname();

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent side='left'>
				<SheetHeader>
					<SheetTitle className='flex items-center gap-1'>
						<Image src={logo} height={40} alt='logo' />
						<p className=' font-bold text-2xl '>Lutos</p>
					</SheetTitle>
				</SheetHeader>
				<div className='flex flex-col gap-8 p-8'>
					{headerData.map(({ title, href }) => (
						<Link
							key={title}
							href={href}
							onClick={() => setOpen(false)}
							className={` hover:text-black  ${
								pathName === href
									? "text-black font-medium"
									: "text-muted-foreground"
							}`}
						>
							{title}
						</Link>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
}
