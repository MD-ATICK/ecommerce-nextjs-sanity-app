"use client";
import MobileSidebarSheet from "@/sheet/components/mobile-sidebar-sheet";
import OpenSearchSheet from "@/sheet/components/open-search-sheet";

export default function SheetProvider() {
	return (
		<>
			<OpenSearchSheet />
			<MobileSidebarSheet />
		</>
	);
}
