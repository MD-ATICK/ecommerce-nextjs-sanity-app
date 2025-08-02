import { create } from "zustand";

type UseOpenSearchProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export const useOpenSearch = create<UseOpenSearchProps>(set => ({
	open: false,
	setOpen: (open: boolean) => set({ open }),
}));
