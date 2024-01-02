<script lang="ts">
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import Drawer, { Content, Scrim } from '@smui/drawer';
	import List, { Item, Text, Graphic, Separator } from '@smui/list';
	import IconButton from '@smui/icon-button';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r: any) {
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error: any) {
					console.log('SW registration error', error);
				}
			});
		}
	});

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	let topAppBar: TopAppBar;
	let open = false;

	const toggleDrawer = () => (open = !open);
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<Drawer variant="modal" fixed={false} bind:open>
	<Row>
		<Section>
			<IconButton class="material-icons" on:click={toggleDrawer}>menu</IconButton>
			<Title>Billsplit</Title>
		</Section>
	</Row>
	<Separator />
	<Content>
		<List>
			<Item href="/" on:click={toggleDrawer} activated={$page.url.pathname === '/'}>
				<Graphic class="material-icons" aria-hidden="true">receipt</Graphic>
				<Text>Bill</Text>
			</Item>
			<Item href="/about" on:click={toggleDrawer} activated={$page.url.pathname === '/about'}>
				<Graphic class="material-icons" aria-hidden="true">info</Graphic>
				<Text>About</Text>
			</Item>
		</List>
	</Content>
</Drawer>

<Scrim fixed={false} />

<TopAppBar bind:this={topAppBar} variant="fixed">
	<Row>
		<Section>
			<IconButton class="material-icons" on:click={toggleDrawer}>menu</IconButton>
			<Title>Billsplit</Title>
		</Section>
	</Row>
</TopAppBar>

<AutoAdjust style="max-width: 1000px; margin: auto" {topAppBar}><slot /></AutoAdjust>
