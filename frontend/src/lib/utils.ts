import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function dateToLocaleDateString(
	date: string | Date,
	formatOptions: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
) {

	date = new Date(date);
	return date.toLocaleString('en-US', formatOptions)
}

export function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};
