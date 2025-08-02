import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { categoriesData, quickLinksData } from "@/constants";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function FooterContent() {
	return (
		<div className=' p-2 grid md:grid-cols-4 lg:grid-cols-6 gap-10 py-12'>
			<div className=' col-span-2 space-y-8'>
				<Image src={logo} alt='logo' height={40} className='' />
				<div className=' space-y-2'>
					<h3 className=' font-semibold'>Popular Genz Shop!</h3>
					<p className=' text-sm text-muted-foreground'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						Perferendis consectetur eius nisi ratione neque fugiat quam porro
						omnis ducimus incidunt.
					</p>
				</div>
			</div>

			<div className=' space-y-6'>
				<h3>Quick Links</h3>
				<div className='flex flex-col gap-5'>
					{quickLinksData.map((item, index) => (
						<Link
							href={item.href}
							key={index}
							className=' hover:text-foreground hover:underline duration-200 text-sm text-muted-foreground'
						>
							{item.title}
						</Link>
					))}
				</div>
			</div>

			<div className=' space-y-6'>
				<h3>Categories</h3>
				<div className='flex flex-col gap-5'>
					{categoriesData.map((item, index) => (
						<Link
							href={item.href}
							key={index}
							className='hover:text-foreground hover:underline duration-200 ease-in-out text-sm text-muted-foreground'
						>
							{item.title}
						</Link>
					))}
				</div>
			</div>

			<div className=' space-y-6 col-span-2 md:col-span-4 lg:col-span-2'>
				<h3>Newsletter</h3>
				<p className=' text-sm text-muted-foreground'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut
					asperiores maxime facere tenetur reprehenderit quisquam cum eos optio
					minima.
				</p>
				<Input placeholder='Enter your email' />
				<Button size={"sm"} className=' w-full'>
					Subscribe
				</Button>
			</div>
		</div>
	);
}
