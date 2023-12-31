<script lang="ts">
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import { pwaInfo } from 'virtual:pwa-info';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
	let topAppBar: TopAppBar;
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<TopAppBar bind:this={topAppBar} variant="fixed">
	<Row>
		<Section>
			<Title>Billsplit</Title>
		</Section>
	</Row>
</TopAppBar>

<AutoAdjust style="max-width: 1000px; margin: auto" {topAppBar}><slot /></AutoAdjust>
