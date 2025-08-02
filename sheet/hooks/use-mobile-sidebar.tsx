import { create } from "zustand";

type useMobileSidebarProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export const useMobileSidebar = create<useMobileSidebarProps>(set => ({
	open: false,
	setOpen: (open: boolean) => set({ open }),
}));
