import { AudioWaveform } from "lucide-react";
import React, { JSX } from "react";

type props = {
	Icon?: JSX.Element;
	shortTitle?: string;
	longTitle?: string;
	description?: string;
};

export default function Banner({
	Icon,
	shortTitle,
	longTitle,
	description,
}: props) {
	return (
		<div className=' relative h-[35vh]  text-background bg-gradient-to-b from-rose-900 to-rose-800 flex justify-center items-center '>
			<div className='  h-full max-w-3xl w-full relative text-center flex flex-col justify-center items-center space-y-4'>
				<div className='flex items-center gap-2'>
					<span className=' h-7 shadow-sm rotate-2 aspect-square rounded-[5px] bg-rose-700 flex justify-center items-center'>
						{Icon ?? <AudioWaveform size={17} />}
					</span>
					<p className=' text-lg font-semibold'>{shortTitle ?? "Outfitino"}</p>
				</div>
				<h1 className=' font-bold text-3xl lg:text-4xl'>
					{longTitle ?? "Single Email Verify"}
				</h1>
				<p className=' text-rose-200   px-8'>
					{description ??
						"Protect your sender reputation keeping your lists free from spam traps, bounces, disposable and catch-all emails."}
				</p>
			</div>
		</div>
	);
}
