<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

{#if $page.data?.session?.user}
	<button on:click={() => signOut()}>Sign out</button>
	<br />
	<span>{$page.data?.session?.user.name}</span>
	<br />
	<span>{$page.data?.session?.user.email}</span>
	<br />
	<img src={$page.data?.session?.user.image} alt="Spotify profile" />
{:else}
	<button on:click={() => signIn('spotify')}>Sign in to spotify</button>
{/if}
