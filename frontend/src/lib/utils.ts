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
