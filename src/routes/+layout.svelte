<script lang="ts">
	import '../app.css';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	let menuOpen = false;
</script>

<header>
	<nav class="bg-white border-zinc-200 px-4 lg:px-6 py-2.5 dark:bg-zinc-800 shadow-lg mb-3">
		<div
			class="hidden justify-between items-center w-full lg:flex lg:flex-row-reverse lg:w-auto lg:order-1 xl:mr-5"
		>
			{#if $page.data?.session}
				<ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 xl:ml-[30rem]">
					<li>
						<button class="nav-dropdown-btn" on:click={() => (menuOpen = !menuOpen)}
							>Hello
							{$page.data.session.user?.name}!
							<svg
								class="w-5 h-5 ml-1"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg></button
						>
						<!-- Dropdown menu -->
						<div
							class="nav-dropdown divide-y divide-gray-200"
							class:show={menuOpen}
							class:hidden={!menuOpen}
						>
							<ul class="navbar-nav">
								<li>
									<a href="#" class="nav-link">Dashboard</a>
								</li>
							</ul>
							<div class="py-1">
								<button
									on:click={() => signOut()}
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white dark:hover:text-white"
									>Sign out</button
								>
							</div>
						</div>
					</li>
				</ul>
			{:else}
				<ul>
					<li>
						<button on:click={() => signIn('spotify')}>Sign in to spotify</button>
					</li>
				</ul>
			{/if}
		</div>
	</nav>
</header>
<main>
	<slot />
</main>
<footer />

<style lang="postcss">
	.nav-link {
		@apply block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white;
	}
	.nav-dropdown {
		@apply z-10 rounded-lg border border-gray-500 bg-white font-normal shadow dark:divide-gray-600 dark:bg-zinc-700 md:w-full xl:absolute xl:mt-3 xl:w-fit;
	}
	.nav-dropdown-btn {
		@apply flex w-full items-center justify-between rounded py-2 pl-3 pr-4 dark:border-gray-700 md:w-auto md:border-0 lg:p-0;
		@apply text-gray-900 dark:text-white dark:focus:text-white lg:dark:hover:text-zinc-500;
		@apply hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:dark:hover:bg-transparent;
	}
	.navbar-nav {
		@apply py-2 text-sm text-gray-900 dark:text-white;
		@apply shadow-inner dark:shadow-none sm:shadow-zinc-500/20;
	}
	.navbar-btn {
		@apply ml-1 inline-flex items-center rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 lg:hidden;
		@apply hover:bg-gray-100 dark:hover:bg-gray-700;
		@apply text-gray-500 dark:text-gray-400;
	}
	.nav-item {
		@apply sm:hover:bg-gray-100 sm:dark:hover:bg-gray-700 sm:dark:hover:text-white lg:hover:bg-transparent lg:dark:hover:bg-inherit;
		@apply rounded-xl;
	}
	
	.nav-link-item {
		@apply block border-b border-gray-100 py-2 pl-3 pr-4 dark:border-gray-700 lg:border-0 lg:p-0;
		@apply hover:bg-gray-100 dark:hover:bg-gray-700 lg:hover:bg-transparent lg:dark:hover:bg-transparent;
		@apply dark:hover:text-white sm:dark:hover:text-white lg:dark:hover:text-zinc-500;
		@apply rounded-xl;
	}
</style>
