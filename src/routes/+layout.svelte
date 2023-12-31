<script lang="ts">
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';

	let topAppBar: TopAppBar;
</script>

<TopAppBar bind:this={topAppBar} variant="fixed">
	<Row>
		<Section>
			<Title>Billsplit</Title>
		</Section>
	</Row>
</TopAppBar>

<AutoAdjust style="max-width: 1000px; margin: auto" {topAppBar}><slot /></AutoAdjust>
