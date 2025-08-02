import { Box, FileQuestion, ReceiptRussianRuble, Send } from "lucide-react";
import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

export default function SingleProductRightBottom() {
	const data: { title: string; icon: React.ReactNode }[] = [
		{
			title: "Compare color",
			icon: <Box size={22} />,
		},
		{
			title: "Ask a question",
			icon: <FileQuestion size={22} />,
		},
		{
			title: "Delivery & Returns",
			icon: <ReceiptRussianRuble size={22} />,
		},
		{
			title: "Share",
			icon: <Send size={22} />,
		},
	];

	return (
		<div className=' space-y-4'>
			{/* Accordion */}
			<Accordion type='single' collapsible className='w-full'>
				<AccordionItem value='item-1'>
					<AccordionTrigger>
						Athletic Men&apos;s Short Sleeve Performance T-Shirt:
						Characteristics
					</AccordionTrigger>
					<AccordionContent>
						<div className=' space-y-3'>
							<div className='flex justify-between items-center'>
								<p className=' text-sm text-muted-foreground'>Brand:</p>
								<p className=' text-sm font-medium'>Unknown</p>
							</div>
							<div className='flex justify-between items-center'>
								<p className=' text-sm text-muted-foreground'>Collection:</p>
								<p className=' text-sm font-medium'>2024</p>
							</div>
							<div className='flex justify-between items-center'>
								<p className=' text-sm text-muted-foreground'>Type:</p>
								<p className=' text-sm font-medium'>tshirt</p>
							</div>
							<div className='flex justify-between items-center'>
								<p className=' text-sm text-muted-foreground'>Stock:</p>
								<p className=' text-sm font-medium'>Available</p>
							</div>
							<div className='flex justify-between items-center'>
								<p className=' text-sm text-muted-foreground'>Intro:</p>
								<p className=' text-sm font-medium'>Classic T-Shirt for men</p>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			{/* 4 Benefits */}
			<div className=' grid grid-cols-2'>
				{data.map((item, index) => (
					<div
						key={index}
						className=' p-2 hover:bg-foreground/10 duration-300 ease-in-out'
					>
						<div className='flex items-center gap-3 py-2'>
							{item.icon}
							<p className=' text-sm'>{item.title}</p>
						</div>
					</div>
				))}
			</div>

			{/* 2 box */}
			<div className='flex items-center gap-3'>
				<div className=' text-center rounded-sm border py-3 px-5 space-y-1 w-fit'>
					<h3 className=' text-sm'>Free Shipping</h3>
					<p className=' text-xs text-muted-foreground'>
						Free Shipping over order $120
					</p>
				</div>
				<div className=' text-center rounded-sm border py-3 px-5 space-y-1 w-fit'>
					<h3 className=' text-sm'>Flexible Payment</h3>
					<p className=' text-xs text-muted-foreground'>
						Pay with Multiple Credit Cards
					</p>
				</div>
			</div>
		</div>
	);
}
