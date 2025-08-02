import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
	const user = await currentUser();
	if (!user) {
		redirect("/");
	}
	return <div></div>;
}
