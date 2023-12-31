<script lang="ts">
	import Button from '@smui/button';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import Card, { Content } from '@smui/card';
	import Fab, { Label, Icon } from '@smui/fab';

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

<Fab
	style="position: fixed; z-index: 1; bottom: 0; right: 0; margin: 2rem;"
	color="primary"
	extended
	on:click={() => {
		people.unshift({
			id: crypto.randomUUID(),
			name: 'Person ' + ++counter,
			products: []
		});
		people = people;
	}}
>
	<Icon class="material-icons">add</Icon>
	<Label>Add person</Label>
</Fab>

<div style="margin: 1rem">
	{#if import.meta.env.DEV}
		<Button variant="raised" style="background-color: orange" on:click={() => console.log(people)}
			>Print</Button
		>
		<Button
			variant="raised"
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
			}}>Default</Button
		>
	{/if}
</div>

{#if !people.length}
	<div style="margin: 1rem">
		<p>Billsplit is an easy and fast way to split restaurant bills</p>
	</div>

	<Card style="margin: 1rem 0.5rem" variant="outlined">
		<Content><p style="margin: 1rem">No one added yet.</p></Content>
	</Card>
{/if}

{#each people as person}
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

				<IconButton
					class="material-icons"
					on:click={() => {
						person.products.unshift({ id: crypto.randomUUID(), name: '', price: null });
						person = person;
					}}
					>add
				</IconButton>

				<IconButton
					class="material-icons"
					on:click={() => {
						people = people.filter((p) => p.id !== person.id);
						people = people;
					}}
					>delete
				</IconButton>
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

					<IconButton
						class="material-icons"
						on:click={() => (person.products = person.products.filter((p) => p.id !== product.id))}
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

{#if people.some((person) => person.products.some((product) => product.price))}
	<Card style="margin: 1rem 0.5rem" variant="outlined">
		<Content>
			<h4>Bill preview</h4>
			<ul style="list-style: none; margin-top: 0; padding: 0rem">
				{#each people as person}
					{#each person.products as product}
						{#if product.price}
							<li>{product.name} ${product.price} - {person.name}</li>
						{/if}
					{/each}
				{/each}
			</ul>

			<h5 style="margin: 1rem 0rem 0rem 0rem">Total value of all products</h5>
			<p style="margin-top: 0;">
				${people.reduce(
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
