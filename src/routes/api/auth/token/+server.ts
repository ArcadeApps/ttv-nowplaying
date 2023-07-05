import { RequestTokenAsync } from '$lib/server/Auth';
import { error, json, type RequestEvent } from '@sveltejs/kit';

export async function GET({ url }: RequestEvent) {
    if (!url.searchParams.get('code'))
        throw error(400, 'invalid auth code');
    
	var state = await RequestTokenAsync(url.searchParams.get('code')!);
    
	return json(state);
}
