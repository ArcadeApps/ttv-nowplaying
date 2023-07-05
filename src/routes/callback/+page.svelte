<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	onMount(() => {
		if (data.status) return;
		goto('/');
	});
</script>

<div>
	<h2>{data.status}</h2>
	<h3>{data.body.message}</h3>
	<a href="/">Go back</a>
</div>
