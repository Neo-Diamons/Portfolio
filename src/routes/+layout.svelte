<script lang="ts">
	import "../app.css";

	import { page } from "$app/state";

	import { ModeWatcher } from "mode-watcher";

	import { AnimatedGridPattern } from "$lib/components/ui/animated-grid-pattern/index.js";

	import Header from "./Header.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<title>Romain Huré - Portfolio</title>
</svelte:head>

<ModeWatcher />

{#if page.error}
	{@render children?.()}
{:else}
	<div class="container mx-auto max-w-screen-lg md:p-8">
		<Header />
		<main class="container mx-auto max-w-screen-lg px-4 pt-16">
			{@render children?.()}
			<AnimatedGridPattern
				numSquares={30}
				maxOpacity={0.1}
				duration={3}
				repeatDelay={1}
				class="fixed inset-x-0 inset-y-[-30%] -z-10 h-[200%] skew-y-12"
			/>
		</main>
	</div>
{/if}
