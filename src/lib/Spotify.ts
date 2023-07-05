import { writable, type Writable } from 'svelte/store';
import type { PlaybackStateResponse } from './models/PlaybackStateResponse';

export const currentPlaying: Writable<{ display: string; data?: PlaybackStateResponse }> = writable(
	{
		display: 'Nothing is playing'
	}
);
export async function getPlaybackAsync(token: string) {
	var state = await fetch('https://api.spotify.com/v1/me/player', {
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json'
		}
	});
	if (state.status === 204) return {};
	var json = (await state.json()) as PlaybackStateResponse;

	if (json.error) return { error: json.error, error_description: json.error_description };
	if (json.is_playing)
		currentPlaying.set({
			display: `${json.item.artists[0].name} - ${json.item.name}`,
			data: json
		});
	else
		currentPlaying.set({
			display: 'Nothing is playing'
		});
	return {};
}
