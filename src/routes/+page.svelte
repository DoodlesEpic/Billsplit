<script lang="ts">
	import Button from '@smui/button';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import Card, { Content } from '@smui/card';
	import Fab, { Label, Icon } from '@smui/fab';
	import { type Product, type Person, people, counter } from '$lib';
	import { afterUpdate, onMount } from 'svelte';

	// Retrieve data from localStorage
	onMount(() => {
		const savedPeople = localStorage.getItem('people');
		if (savedPeople) people.set(JSON.parse(savedPeople));

		const savedCounter = localStorage.getItem('counter');
		if (savedCounter) counter.set(JSON.parse(savedCounter));
	});

	// Persist data to localStorage
	afterUpdate(() => {
		localStorage.setItem('people', JSON.stringify($people));
		localStorage.setItem('counter', JSON.stringify($counter));
	});

	// People management
	const addPerson = () => {
		counter.set($counter + 1);
		people.set([
			...$people,
			{
				id: crypto.randomUUID(),
				name: 'Person ' + $counter,
				products: []
			}
		]);
	};

	const removePerson = (person: Person) => people.set($people.filter((p) => p.id !== person.id));

	// Product manangement
	const addProduct = (person: Person) =>
		people.update(($people) =>
			$people.map((p) =>
				p.id === person.id
					? { ...p, products: [{ id: crypto.randomUUID(), name: '', price: null }, ...p.products] }
					: p
			)
		);

	const removeProduct = (person: Person, product: Product) =>
		people.update(($people) =>
			$people.map((p) =>
				p.id === person.id ? { ...p, products: p.products.filter((p) => p.id !== product.id) } : p
			)
		);

	// Testing functions
	const printData = () => console.log($people);
	const mockData = () =>
		people.set([
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
		]);
</script>

<Fab
	style="position: fixed; z-index: 1; bottom: 0; right: 0; margin: 2rem;"
	color="primary"
	extended
	on:click={addPerson}
>
	<Icon class="material-icons">add</Icon>
	<Label>Add person</Label>
</Fab>

<div style="margin: 1rem">
	{#if import.meta.env.DEV}
		<Button variant="raised" style="background-color: orange" on:click={printData}>Print</Button>
		<Button variant="raised" style="background-color: orange" on:click={mockData}>Default</Button>
	{/if}
</div>

{#if !$people.length}
	<div style="margin: 1rem">
		<p>Billsplit is an easy and fast way to split restaurant bills</p>
	</div>

	<Card style="margin: 1rem 0.5rem" variant="outlined">
		<Content><p style="margin: 1rem">No one added yet.</p></Content>
	</Card>
{/if}

{#each $people as person}
	<Card style="margin: 1rem 0.5rem" variant="outlined">
		<Content>
			<div class="row">
				<Textfield
					class="name"
					placeholder="Person name"
					label="Person name"
					type="text"
					bind:value={person.name}
				/>

				<IconButton class="material-icons" on:click={() => addProduct(person)}>add</IconButton>
				<IconButton class="material-icons" on:click={() => removePerson(person)}>delete</IconButton>
			</div>

			{#each person.products as product}
				<div class="row">
					<Textfield
						type="text"
						placeholder="Product name"
						variant="outlined"
						bind:value={product.name}
						label="Product name"
					/>

					<Textfield
						type="number"
						variant="outlined"
						placeholder="Product price"
						bind:value={product.price}
						label="Product price"
						prefix="$"
						input$pattern={'\\d+(\\.\\d{2})?'}
					/>

					<IconButton class="material-icons" on:click={() => removeProduct(person, product)}
						>delete
					</IconButton>
				</div>
			{/each}

			<p>
				<bold> ${person.products.reduce((acc, product) => acc + (product.price ?? 0), 0)} </bold>
			</p>
		</Content>
	</Card>
{/each}

{#if $people.some((person) => person.products.some((product) => product.price))}
	<Card style="margin: 1rem 0.5rem" variant="outlined">
		<Content>
			<h4>Bill preview</h4>
			<ul style="list-style: none; margin-top: 0; padding: 0rem">
				{#each $people as person}
					{#each person.products as product}
						{#if product.price}
							<li>{product.name} ${product.price} - {person.name}</li>
						{/if}
					{/each}
				{/each}
			</ul>

			<h5 style="margin: 1rem 0rem 0rem 0rem">Total value of all products</h5>
			<p style="margin-top: 0;">
				${$people.reduce(
					(acc, person) =>
						acc + person.products.reduce((acc, product) => acc + (product.price ?? 0), 0),
					0
				)}
			</p>
		</Content>
	</Card>
{/if}

<style>
	h5,
	h4 {
		margin: 0rem;
		padding: 0rem;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 1rem 0rem;
	}
</style>
