import { writable } from 'svelte/store';

export type Product = {
	id: string;
	name: string;
	price: number | null;
};

export type Person = {
	id: string;
	name: string;
	products: Product[];
};

export const people = writable<Person[]>([]);
export const counter = writable(0);
