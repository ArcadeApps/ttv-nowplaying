<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore, login } from '$lib/Auth';
	import type { AppState } from '$lib/models/AppState';
	import type { TokenResponse } from '$lib/models/TokenResponse';
	import { writable, type Writable } from 'svelte/store';
	export let data: { authState: TokenResponse };
	$: authStore.set(data.authState);
	let appState: Writable<AppState> = writable({
		authState: $authStore,
		overrides: {
			font_family: 'Inter, Avenir, Helvetica, Arial, sans-serif',
			font_size: 1.7,
			darkMode: true,
			wordWrap: true,
			upperCase: true
		}
	});
</script>

{#if $authStore != null}
	<div class="fixed-top">
		<h3>Display settings</h3>
		<ul class="options">
			<li>
				<span>Dark mode?</span>
				<input bind:checked={$appState.overrides.darkMode} type="checkbox" />
			</li>
			<li>
				<span>All uppercase?</span>
				<input bind:checked={$appState.overrides.upperCase} type="checkbox" />
			</li>
			<li>
				<span>Wrap words?</span>
				<input bind:checked={$appState.overrides.wordWrap} type="checkbox" />
			</li>
			<li>
				<span>Font</span>
				<input bind:value={$appState.overrides.font_family} type="text" />
			</li>
			<li>
				<span>Font size</span>
				<input bind:value={$appState.overrides.font_size} type="number" />
			</li>
		</ul>
		<button on:click={() => goto('/nowplaying?state=' + btoa(JSON.stringify({
			authState: $authStore,
			overrides: $appState.overrides
		})))}
			>Get Overlay url</button
		>
		<div>
			<h3>Preview</h3>
			<div style="display: flex; flex-direction: row; align-items: center; gap: 1rem;">
				<span
					style="{$appState.overrides?.darkMode ? '' : 'background: white; color: black;'} font-family: {$appState.overrides?.font_family}; font-size: {$appState.overrides
						?.font_size}em; {$appState.overrides?.wordWrap ? '' : 'word-wrap: break-word;'} {$appState.overrides?.upperCase
						? 'text-transform: uppercase;font-weight: bold;'
						: ''}">Grant - Dead Man Walking</span
				>
				<img src="https://i.scdn.co/image/ab67616d0000b2739e6efbf87d6460f4d7a387e0" width=64 alt="">
			</div>
		</div>
	</div>
{:else}
	<button on:click={login}>Login</button>
{/if}

<style>
	ul.options {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		list-style: none;
	}
	ul.options > li {
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
	li > :last-child {
		margin-left: auto;
	}
</style>
