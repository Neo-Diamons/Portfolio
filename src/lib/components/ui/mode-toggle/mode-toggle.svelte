<script lang="ts">
	import { Sun, Moon } from "lucide-svelte";

	import { resetMode, setMode } from "mode-watcher";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { buttonVariants } from "$lib/components/ui/button/index.js";

	let { children = undefined } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={buttonVariants(children ? { variant: "link" } : { variant: "outline", size: "icon" })}
	>
		<div class="flex size-4 items-center justify-center">
			<Sun
				class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
			/>
		</div>
		{@render children?.()}
		<span class="sr-only">Toggle theme</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align={children ? "center" : "end"}>
		<DropdownMenu.Item onclick={() => setMode("light")}>Light</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => setMode("dark")}>Dark</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
