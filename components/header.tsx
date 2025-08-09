"use client";
import React from "react";
import HeaderMenu from "./header-menu";
import Logo from "./logo";
import Container from "./container";
import MobileNav from "./mobile-nav";
import HeaderActions from "./header-actions";
import { MoveRight } from "lucide-react";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
	const user = useUser();

	return (
		<header className='border-b'>
			<Container className=' flex justify-between items-center py-2'>
				<div className='flex items-center gap-1'>
					<MobileNav />
					<Logo />
				</div>

				<HeaderMenu />
				<div className='flex items-center gap-5'>
					<HeaderActions />
					{/* sign in */}
					<ClerkLoaded>
						{!user && (
							<SignInButton mode='modal'>
								<p className='  cursor-pointer text-muted-foreground hover:text-foreground text-sm font-medium flex items-center gap-2'>
									Sign In <MoveRight size={18} />{" "}
								</p>
							</SignInButton>
						)}
					</ClerkLoaded>

					<ClerkLoaded>
						<UserButton />
					</ClerkLoaded>
				</div>
			</Container>
		</header>
	);
}
