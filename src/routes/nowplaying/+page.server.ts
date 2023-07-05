import { getLoginUri } from '$lib/Auth';
import type { AppState } from '$lib/models/AppState';
import { RefreshTokenAsync } from '$lib/server/Auth';
import { getPlaybackAsync } from '$lib/Spotify';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export async function load({ url, cookies }: PageServerLoadEvent) {
	let cookie = cookies.get('appState') || url.searchParams.get('state');
	if (!cookie) throw redirect(307, getLoginUri());

	let state = JSON.parse(atob(cookie)) as AppState;
	if (!state.authState) throw redirect(307, getLoginUri());


	if (!state.overrides) {
		var uriState = JSON.parse(atob(url.searchParams.get('state')!)) as AppState;
		state.overrides = uriState.overrides || {
			font_family: 'Inter, Avenir, Helvetica, Arial, sans-serif',
			font_size: 1.7,
			darkMode: true,
			wordWrap: true,
			upperCase: true
		};
	}
	var res = await getPlaybackAsync(state.authState.access_token);
	if (res.error) {
		var tokenRes = await RefreshTokenAsync(state.authState.refresh_token);
		if (tokenRes.error) throw redirect(307, getLoginUri());

		tokenRes.refresh_token = state.authState.refresh_token;
        state.authState = tokenRes;
		cookies.set('appState', btoa(JSON.stringify(state)), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30
		});
	}

	return {
		authState: state.authState,
		overrides: state.overrides
	};
}
