import { writable } from 'svelte/store';
import type { Person } from '$lib/types';

export const people = writable<Person[]>([]);
export const counter = writable(0);

export const mockData: Person[] = [
	{
		id: crypto.randomUUID(),
		name: 'Person 1',
		products: [
			{
				id: crypto.randomUUID(),
				name: 'Product 1',
				price: 100
			},
			{
				id: crypto.randomUUID(),
				name: 'Product 2',
				price: 200
			}
		]
	},
	{
		id: crypto.randomUUID(),
		name: 'Person 2',
		products: [
			{
				id: crypto.randomUUID(),
				name: 'Product 1',
				price: 100
			}
		]
	}
];
