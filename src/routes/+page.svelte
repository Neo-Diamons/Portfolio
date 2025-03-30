<script lang="ts">
	import { IsMobile } from "$lib/components/hook/is-mobile.svelte.js";

	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as HoverCard from "$lib/components/ui/hover-card/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";

	import { Hammer, Package } from "lucide-svelte";

	import C from "$lib/assets/icons/languages/c.svg";
	import Cpp from "$lib/assets/icons/languages/cpp.svg";
	import Bash from "$lib/assets/icons/languages/bash.svg";
	import Python from "$lib/assets/icons/languages/python.svg";
	import HTML from "$lib/assets/icons/languages/html.svg";
	import CSS from "$lib/assets/icons/languages/css.svg";
	import Javascript from "$lib/assets/icons/languages/javascript.svg";
	import TypeScript from "$lib/assets/icons/languages/typescript.svg";
	import React from "$lib/assets/icons/frameworks/react.svg";
	import Svelte from "$lib/assets/icons/frameworks/svelte.svg";
	import TailwindCSS from "$lib/assets/icons/frameworks/tailwindcss.svg";
	import NestJS from "$lib/assets/icons/frameworks/nestjs.svg";
	import Docker from "$lib/assets/icons/devops/docker.svg";
	import GitHubActions from "$lib/assets/icons/devops/github-actions.svg";

	import repositories from "$lib/assets/json/repositories.json";
	import languages from "$lib/assets/json/languages.json";

	const isMobile = new IsMobile();
	const data: {
		[key: string]: { name: string; icon: string }[];
	} = {
		language: [
			{ name: "C", icon: C },
			{ name: "C++", icon: Cpp },
			{ name: "Bash", icon: Bash },
			{ name: "Python", icon: Python },
			{ name: "HTML", icon: HTML },
			{ name: "CSS", icon: CSS },
			{ name: "JavaScript", icon: Javascript },
			{ name: "TypeScript", icon: TypeScript }
		],
		frameworks: [
			{ name: "React", icon: React },
			{ name: "Svelte", icon: Svelte },
			{ name: "TailwindCSS", icon: TailwindCSS },
			{ name: "NestJS", icon: NestJS }
		],
		devops: [
			{ name: "Docker", icon: Docker },
			{ name: "GitHub Actions", icon: GitHubActions }
		]
	};

	function sortLanguages(languages: Record<string, number>) {
		const sum = Object.values(languages).reduce((a, b) => a + b, 0);
		const sortedLanguages = Object.entries(languages)
			.sort(([, a], [, b]) => b - a)
			.map(([key, value]) => {
				const percentage = ((value / sum) * 100).toFixed(2);
				return { name: key, percentage };
			});

		return sortedLanguages;
	}
</script>

{#snippet displayData(key: string)}
	<div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
		{#each data[key] as item (item.name)}
			<div class="flex flex-row items-center gap-2">
				<img src={item.icon} alt={item.name} class="size-8" />
				<h3 class="text-lg font-bold">{item.name}</h3>
			</div>
		{/each}
	</div>
{/snippet}

<div class="flex flex-col gap-16">
	<div class="flex flex-col gap-4">
		<div class="flex flex-row items-center gap-2">
			<Hammer className="size-8" />
			<h2 class="text-2xl font-bold">Technologies used</h2>
		</div>
		<Tabs.Root value="language">
			<Tabs.List class={isMobile.current ? "w-full *:w-full" : "w-fit"}>
				<Tabs.Trigger value="language">Language</Tabs.Trigger>
				<Tabs.Trigger value="frameworks">Frameworks</Tabs.Trigger>
				<Tabs.Trigger value="devops">DevOps</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="language" class="w-full">
				{@render displayData("language")}
			</Tabs.Content>
			<Tabs.Content value="frameworks" class="w-full">
				{@render displayData("frameworks")}
			</Tabs.Content>
			<Tabs.Content value="devops" class="w-full">
				{@render displayData("devops")}
			</Tabs.Content>
		</Tabs.Root>
	</div>

	<div class="flex flex-col gap-4">
		<div class="flex flex-row items-center gap-2">
			<Package className="size-8" />
			<h2 class="text-2xl font-bold">Notable projects</h2>
		</div>
		<div class="grid gap-4 md:grid-cols-2">
			{#each repositories as data (data.name)}
				<Card.Root class="flex h-full w-full flex-col justify-start overflow-hidden">
					<a href={data.url} target="_blank" rel="noreferrer" class="flex h-full flex-col">
						<Card.Header>
							<Card.Title class="text-lg">{data.name}</Card.Title>
							<Card.Description class="flex flex-row gap-1">
								{#each data.topics as topic (topic)}
									<Badge class="bg-blue-600/30 text-blue-600 hover:bg-blue-950/30">
										{topic}
									</Badge>
								{/each}
							</Card.Description>
						</Card.Header>
						<Card.Content>{data.description}</Card.Content>
						<Card.Footer class="text-small grow items-end opacity-50">
							Last update: {new Date(data.lastUpdate).toLocaleDateString("en-US")}
						</Card.Footer>
					</a>
					<div class="flex flex-row gap-1">
						{#each sortLanguages(data.languages as unknown as Record<string, number>) as language (language)}
							<HoverCard.Root openDelay={100} closeDelay={0}>
								<HoverCard.Trigger
									style="
										width: {language.percentage}%;
										background-color: {languages[language.name as keyof typeof languages]};"
									class="h-1"
								></HoverCard.Trigger>
								<HoverCard.Content class="flex flex-row items-center gap-2">
									<div
										style="
											background-color: {languages[language.name as keyof typeof languages]};"
										class="size-4 rounded-full"
									></div>
									<p>
										{language.name} - {language.percentage}%
									</p>
								</HoverCard.Content>
							</HoverCard.Root>
						{/each}
					</div>
				</Card.Root>
			{/each}
		</div>
	</div>
</div>
