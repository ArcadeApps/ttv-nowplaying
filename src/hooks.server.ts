import type { AppState } from '$lib/models/AppState';
import type { TokenResponse } from '$lib/models/TokenResponse';
import type { Handle, HandleServerError } from '@sveltejs/kit';

export async function handle({ event, resolve }: Handle) {
	const appState = event.cookies.get('appState');
	if (!appState) return resolve(event);
	let state = JSON.parse(atob(appState)) as AppState;

	event.locals.authState = state.authState;
	return resolve(event);
}

export function handleError({ error, event }: HandleServerError) {
	event.clientIpAddress = event.getClientAddress();
	if (error.toString().indexOf('Not found') > 0) {
		console.log(
			`user with ip: ${event.clientIpAddress} tried to access ${
				event.url.href
			} which doesnt exist\n\nTrace: ${JSON.stringify(event)}`
		);
		return {
			message: 'The file does not exist. Nessecary trace info was forwarded'
		};
	}
	console.log(`user with ip: ${event.clientIpAddress} triggered an unhandled error\n\nTrace: ${error.toString()}\n\nState: ${JSON.stringify(event)}`);
	return {
		message: 'Whoops an unhandled error occured, sorry for the inconvenience.'
	};
}
