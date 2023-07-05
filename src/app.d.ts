// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { TokenResponse } from "$lib/models/TokenResponse"

// and what to do when importing types
declare namespace App {
	interface Error {
		error: string,
		error_description: string
	}
	interface Locals {
		authState: TokenResponse
	}
	// interface PageData {}
	// interface Platform {}
}
