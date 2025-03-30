<script lang="ts">
	import { IsMobile } from "$lib/components/hook/is-mobile.svelte.js";

	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { ModeToggle } from "$lib/components/ui/mode-toggle/index.js";

	import { Github, Linkedin, Mail, Menu, X } from "@lucide/svelte";

	import Profile from "$lib/assets/images/profile.webp";

	const isMobile = new IsMobile();
	let isOpened = $state(false);
</script>

<header class="bg-background sticky top-0 z-50 shadow-md">
	<div class="flex h-16 items-center justify-between px-4">
		<div class="flex h-full items-center gap-4">
			<Avatar.Root class="size-8 rounded-none">
				<Avatar.Image src={Profile} alt="Profile picture" />
				<Avatar.Fallback class="rounded-none">RH</Avatar.Fallback>
			</Avatar.Root>
			<h1 class="text-xl font-bold">Romain HURÉ</h1>
		</div>

		{#if isMobile.current}
			<div class="flex h-full items-center gap-4">
				<Button
					variant="outline"
					size="icon"
					onclick={() => (isOpened = !isOpened)}
					aria-label="Menu"
				>
					<Menu class="!size-6" />
				</Button>
			</div>

			<div
				class={`bg-background fixed inset-0 z-50 transition-opacity duration-300 ${
					isOpened ? "opacity-100" : "pointer-events-none opacity-0"
				}`}
			>
				<div class="flex h-full flex-col items-center justify-center">
					<Button variant="link">
						<a
							href="https://github.com/Neo-Diamons"
							target="_blank"
							aria-label="GitHub"
							rel="noopener noreferrer"
							class="flex items-center gap-2"
						>
							<Github /> GitHub
						</a>
					</Button>
					<Button variant="link">
						<a
							href="https://www.linkedin.com/in/romain-hur%C3%A9/"
							target="_blank"
							aria-label="LinkedIn"
							rel="noopener noreferrer"
							class="flex items-center gap-2"
						>
							<Linkedin /> LinkedIn
						</a>
					</Button>
					<Button variant="link">
						<a
							href="mailto:romain.hure@epitech.eu"
							aria-label="Email"
							class="flex items-center gap-2"
						>
							<Mail /> Email
						</a>
					</Button>
					<ModeToggle>Theme</ModeToggle>
					<Button variant="link" onclick={() => (isOpened = false)}>
						<X /> Close
					</Button>
				</div>
			</div>
		{:else}
			<div class="flex h-full items-center gap-4">
				<a
					href="https://github.com/Neo-Diamons"
					target="_blank"
					aria-label="GitHub"
					rel="noopener noreferrer"
				>
					<Github class="h-6 w-6" />
				</a>
				<a
					href="https://www.linkedin.com/in/romain-hur%C3%A9/"
					target="_blank"
					aria-label="LinkedIn"
					rel="noopener noreferrer"
				>
					<Linkedin class="h-6 w-6" />
				</a>
				<a href="mailto:romain.hure@epitech.eu" aria-label="Email">
					<Mail class="h-6 w-6" />
				</a>
				<ModeToggle />
			</div>
		{/if}
	</div>
	<Separator />
</header>
