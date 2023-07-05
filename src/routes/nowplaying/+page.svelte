<script lang="ts">
	import { fade } from 'svelte/transition';
	import { authStore, login } from '$lib/Auth';
	import { currentPlaying, getPlaybackAsync } from '$lib/Spotify';
	import { onDestroy, onMount } from 'svelte';
	import { RefreshTokenAsync } from '$lib/Auth';
	import { writable, type Writable } from 'svelte/store';
	import type { AppState } from '$lib/models/AppState';

	export let data: AppState;
	let appState: Writable<AppState> = writable();
	$: authStore.set(data.authState);
	$: appState.set(data)
	let updateSpotify: NodeJS.Timer;
	onMount(async () => {
		if (!$authStore) {
			login();
			return;
		}

		if (!updateSpotify)
			updateSpotify = setInterval(async () => {
				var res = await getPlaybackAsync($authStore.access_token);
				if (!res.error) return;
				var tokenRes = await RefreshTokenAsync($authStore.refresh_token);
				if (tokenRes.error) login();
				else $authStore.access_token = tokenRes.access_token;
			}, 10000);
		await getPlaybackAsync($authStore.access_token);
	});
	onDestroy(() => {
		if (updateSpotify) clearInterval(updateSpotify);
	});
</script>

{#if $authStore != null}
	{#key $currentPlaying.display}
		<div
			class="fixed-top"
			style="display: flex; flex-direction: row; align-items: center; gap: 1rem;"
			in:fade
		>
			<span class:test={$currentPlaying.data == null} style="{$appState.overrides?.darkMode ? '' : 'background: white; color: black;'} font-family: {$appState.overrides?.font_family}; font-size: {$appState.overrides
				?.font_size}em; {$appState.overrides?.wordWrap ? 'word-wrap: break-word;' : ''} {$appState.overrides?.upperCase
				? 'text-transform: uppercase;font-weight: bold;'
				: ''}">{$currentPlaying.display}</span>
			{#if $currentPlaying.data != null}
				<img src={$currentPlaying.data.item.album.images[0].url} width="64" alt="" />
			{/if}
		</div>
	{/key}
{/if}

<style>
	span {
		font-weight: bold;
		word-wrap: break-word;
		text-transform: uppercase;
		font-size: 1.7em;
		line-height: 1.1;
	}
	.test {
		padding-top: 1rem;
	}
</style>
