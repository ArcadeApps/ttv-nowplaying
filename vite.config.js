import { sveltekit } from '@sveltejs/kit/vite';
import * as fs from 'fs';

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		host: '0.0.0.0',
		port: 80
	},
	plugins: [sveltekit()]
};

export default config;
