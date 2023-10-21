<script lang="ts">
	type Product = {
		id: string;
		name: string;
		price: number | null;
	};

	type Person = {
		id: string;
		name: string;
		products: Product[];
	};

	let people: Person[] = [];

	let counter = 2;
</script>

<div>
	<h1>Billsplit</h1>
	<p>A fast and easy way to split restaurant bills</p>
</div>

<div style="margin-bottom: .5rem;">
	<button
		on:click={() => {
			people.unshift({
				id: crypto.randomUUID(),
				name: 'Person ' + ++counter,
				products: []
			});
			people = people;
		}}>Add person</button
	>

	{#if import.meta.env.DEV}
		<button style="background-color: orange" on:click={() => console.log(people)}>Print</button>
		<button
			style="background-color: orange"
			on:click={() => {
				people = [
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
			}}>Default</button
		>
	{/if}
</div>

{#if !people.length}
	<p>No one added yet.</p>
{/if}

{#each people as person}
	<div class="card">
		<button
			on:click={() => {
				people = people.filter((p) => p.id !== person.id);
				people = people;
			}}>Delete person</button
		>

		<button
			on:click={() => {
				person.products.unshift({ id: crypto.randomUUID(), name: '', price: null });
				person = person;
			}}>Add product</button
		>

		<input class="name" placeholder="Person name" type="text" bind:value={person.name} />
		{#each person.products as product}
			<div>
				<input type="text" placeholder="Product name" bind:value={product.name} />
				<input class="price" placeholder="Product price" type="number" bind:value={product.price} />
				<button
					on:click={() => (person.products = person.products.filter((p) => p.id !== product.id))}
					>Delete product</button
				>
			</div>
		{/each}

		<p>
			<bold> ${person.products.reduce((acc, product) => acc + (product.price ?? 0), 0)} </bold>
		</p>
	</div>
{/each}

{#if people.some((person) => person.products.some((product) => product.price))}
	<div class="card">
		<h2>Bill preview</h2>
		<ul style="list-style: none">
			{#each people as person}
				{#each person.products as product}
					{#if product.price}
						<li>{product.name} ${product.price} - {person.name}</li>
					{/if}
				{/each}
			{/each}
		</ul>

		<h2 style="margin-top: 1rem;">Total value of all products</h2>
		<p>
			${people.reduce(
				(acc, person) => acc + person.products.reduce((acc, product) => acc + product.price, 0),
				0
			)}
		</p>
	</div>
{/if}

<style>
	h2 {
		margin: 0rem;
		padding: 0rem;
	}

	input {
		margin-bottom: 0.5rem;
		padding: 0.5rem;
		border: 1px solid black;
		border-radius: 0.5rem;
	}

	button {
		padding: 0.5rem;
		background-color: white;
		border: 1px solid black;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	button:hover {
		background-color: black;
		color: white;
	}

	.name {
		border: none;
	}

	.card {
		border: 1px solid black;
		padding: 1rem;
		margin-bottom: 1rem;
		border-radius: 0.5rem;
	}
</style>
