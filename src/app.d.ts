// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData { params: any }
		// interface Platform {}
		interface User {
			id: string;
			name: string;
			email: string;
			image: string;
		}
		interface Session {
			user?: User;
			expires: string;
			accessToken?: string;
		}
	}
}

export { };
