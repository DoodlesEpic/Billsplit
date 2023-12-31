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

<AutoAdjust {topAppBar}><slot /></AutoAdjust>
