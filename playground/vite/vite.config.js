import { defineConfig } from 'vite';
import svelte from '@sveltejs/vite-plugin-svelte';
import svelterial from 'vite-plugin-svelte-svelterial';

export default defineConfig({
  plugins: [
    svelte(),
    svelterial({
      variables: {
        Component: {
          color: 'green',
        },
      },
    }),
  ],
});
