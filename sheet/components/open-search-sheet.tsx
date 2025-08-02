import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useOpenSearch } from "../hooks/use-open-search";
import { Input } from "@/components/ui/input";

export default function OpenSearchSheet() {
	const { open, setOpen } = useOpenSearch();

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Search</SheetTitle>
				</SheetHeader>
				<div>
					<Input placeholder='Search' />
				</div>
			</SheetContent>
		</Sheet>
	);
}
