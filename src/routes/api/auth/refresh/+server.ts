import { RefreshTokenAsync } from '$lib/server/Auth';
import { error, json, type RequestEvent } from '@sveltejs/kit';

export async function GET({ url, cookies }: RequestEvent) {
    if (!url.searchParams.get('refresh_token'))
        throw error(400, 'invalid auth code');
    let refresh_token = url.searchParams.get('refresh_token')!;
	var state = await RefreshTokenAsync(refresh_token);
    state.refresh_token = refresh_token;
    cookies.set('authState', btoa(JSON.stringify(state)), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30
	});
	return json(state);
}
