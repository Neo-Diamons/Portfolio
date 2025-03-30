<script lang="ts">
	import { page } from "$app/state";

	import Button from "$lib/components/ui/button/button.svelte";

	import { Home } from "lucide-svelte";
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<h1 class="text-9xl font-bold">{page.status}</h1>
	<p class="text-lg">{page.error?.message}</p>

	<Button href="/" class="mt-4">
		<Home class="mr-2 size-4" />
		Go back home
	</Button>
</div>
