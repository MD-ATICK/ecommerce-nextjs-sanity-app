import React from "react";
import Container from "./container";

export default function HomeBanner() {
	return (
		<Container className=' py-10'>
			<div className=' text-center w-full md:w-2/3 space-y-2 mx-auto'>
				<h1 className=' font-semibold text-3xl'>Best Clothing Collection</h1>
				<p className=' text-muted-foreground'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
					accusamus magnam quos accusantium itaque consectetur harum rerum totam
					obcaecati necessitatibus?
				</p>
			</div>
		</Container>
	);
}
