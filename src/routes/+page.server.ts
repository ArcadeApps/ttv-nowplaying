import type { PageServerLoadEvent } from "./$types";

export function load({ request, locals, cookies }: PageServerLoadEvent) {
    return {
        authState: locals.authState
    }
}