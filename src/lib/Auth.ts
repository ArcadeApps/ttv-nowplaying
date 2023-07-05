import { writable, type Writable } from 'svelte/store';
import type { TokenResponse } from './models/TokenResponse';

export const calbackUri: string = 'https://localhost/callback';
export const storageKey: string = 'authState';
export const appId: string = 'fb6f942a77e347a6adbbc0410122d979';
export const appScopes: string = 'user-read-playback-state user-read-currently-playing';
export const authStore: Writable<TokenResponse> = writable();

export function login() {
	window.location.href = getLoginUri();
}
export function getLoginUri(): string {
	return (
		'https://accounts.spotify.com/authorize?' +
		`response_type=code&client_id=${appId}&scope=${appScopes}&redirect_uri=${calbackUri}`
	);
}
export async function RefreshTokenAsync(token: string) {
	const res = await fetch(`/api/auth/refresh?refresh_token=${token}`);
	const state: TokenResponse = await res.json();
	return state;
}