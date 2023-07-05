import type { TokenResponse } from '$lib/models/TokenResponse';
import type { PageServerLoadEvent } from './$types';
import { error, redirect } from '@sveltejs/kit';
import type { AppState } from '$lib/models/AppState';

export async function load({ request, url, fetch, cookies }: PageServerLoadEvent) {
	const res = await fetch(`/api/auth/token${url.search}`);
	const state: TokenResponse = await res.json();
	if (state.error) {
		return {
			status: 400,
			body: {
				message: state.error_description,
			}
		};
	}
	let appState: AppState = {
		authState: state
	}
	cookies.set('appState', btoa(JSON.stringify(appState)), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30
	});
	throw redirect(307, '/');
}
