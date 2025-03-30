<script lang="ts">
	import { onMount } from "svelte";
	import { cn } from "$lib/utils";

	interface AnimatedGridPatternProps {
		width?: number;
		height?: number;
		x?: number;
		y?: number;
		strokeDasharray?: string | number;
		numSquares?: number;
		class?: string;
		maxOpacity?: number;
		duration?: number;
		repeatDelay?: number;
	}

	let {
		width = 40,
		height = 40,
		x = -1,
		y = -1,
		strokeDasharray = 0,
		numSquares = 50,
		class: className = "",
		maxOpacity = 0.5,
		duration = 4,
		repeatDelay = 0.5,
		...restProps
	}: AnimatedGridPatternProps = $props();

	const id = crypto.randomUUID();
	let containerRef: SVGSVGElement;
	let dimensions = $state({ width: 0, height: 0 });

	function getPos(): [number, number] {
		return [
			Math.floor((Math.random() * dimensions.width) / width),
			Math.floor((Math.random() * dimensions.height) / height)
		];
	}

	function generateSquares(count: number) {
		return Array.from({ length: count }, (_, i) => ({
			id: i,
			pos: getPos()
		}));
	}

	let squares = $state(generateSquares(numSquares));

	function updateSquarePosition(id: number) {
		setTimeout(() => {
			squares = squares.map((sq) =>
				sq.id === id
					? {
							...sq,
							pos: getPos()
						}
					: sq
			);
		}, repeatDelay * 1000);
	}

	$effect(() => {
		if (dimensions.width && dimensions.height) {
			squares = generateSquares(numSquares);
		}
	});

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				dimensions = {
					width: entry.contentRect.width,
					height: entry.contentRect.height
				};
			}
		});

		if (containerRef) {
			resizeObserver.observe(containerRef);
		}

		return () => {
			if (containerRef) {
				resizeObserver.unobserve(containerRef);
			}
		};
	});
</script>

<svg
	bind:this={containerRef}
	aria-hidden="true"
	class={cn(
		"pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
		className
	)}
	{...restProps}
>
	<defs>
		<pattern {id} {width} {height} patternUnits="userSpaceOnUse" {x} {y}>
			<path d={`M.5 ${height}V.5H${width}`} fill="none" stroke-dasharray={strokeDasharray} />
		</pattern>
	</defs>
	<rect width="100%" height="100%" fill={`url(#${id})`} />
	<svg {x} {y} class="overflow-visible">
		{#each squares as { pos: [squareX, squareY], id: squareId }, index (`${squareX}-${squareY}-${index}`)}
			<rect
				class="animated-square"
				style="
					--max-opacity: {maxOpacity};
					--duration: {duration}s;
					--delay: {index * 0.1}s;
				"
				onanimationend={() => updateSquarePosition(squareId)}
				width={width - 1}
				height={height - 1}
				x={squareX * width + 1}
				y={squareY * height + 1}
				fill="currentColor"
				stroke-width="0"
			/>
		{/each}
	</svg>
</svg>

<style>
	.animated-square {
		opacity: 0;
		animation: fade var(--duration, 4s) var(--delay, 0s) 1 alternate forwards;
	}

	@keyframes fade {
		0%,
		100% {
			opacity: 0;
		}
		50% {
			opacity: var(--max-opacity, 0.5);
		}
	}
</style>
