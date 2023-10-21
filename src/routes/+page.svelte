<script lang="ts">
	type Product = {
		id: string;
		name: string;
		price: number;
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

	<button on:click={() => console.log(people)}>Print</button>
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
				person.products.unshift({ id: crypto.randomUUID(), name: 'Coke', price: 2 });
				person = person;
			}}>Add product</button
		>

		<input class="name" type="text" bind:value={person.name} />
		{#each person.products as product}
			<div>
				<input type="text" bind:value={product.name} />
				<input class="price" type="text" bind:value={product.price} />
				<button
					on:click={() => (person.products = person.products.filter((p) => p.id !== product.id))}
					>Delete product</button
				>
			</div>
		{/each}
	</div>
{/each}

{#if people.length}
	<div>
		<p>
			Total value of all products: ${people.reduce(
				(acc, person) => acc + person.products.reduce((acc, product) => acc + product.price, 0),
				0
			)}
		</p>
	</div>
{/if}

<style>
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