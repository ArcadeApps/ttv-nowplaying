import { appId, calbackUri } from '$lib/Auth';
import type { TokenResponse } from '../models/TokenResponse';

const appSecret: string = '';

export async function RefreshTokenAsync(refreshToken: string) {
	const data = new URLSearchParams();
	data.append('refresh_token', refreshToken);
	data.append('grant_type', 'refresh_token');
	data.append('client_id', appId);

	var res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		body: data,
		headers: {
			Authorization: 'Basic ' + btoa(appId + ':' + appSecret)
		}
  });
	return (await res.json()) as TokenResponse;
}
export async function RequestTokenAsync(code: string) {
	const data = new URLSearchParams();
	data.append('code', code);
	data.append('redirect_uri', calbackUri);
	data.append('grant_type', 'authorization_code');
	var res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		body: data,
		headers: {
			Authorization: 'Basic ' + btoa(appId + ':' + appSecret)
		}
	});

	return (await res.json()) as TokenResponse;
}
