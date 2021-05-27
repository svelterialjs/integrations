import svelterial from 'vite-plugin-svelte-svelterial';

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    target: '#svelte',
    vite: () => ({
      plugins: [
        svelterial({
          Component: {
            color: 'red',
          },
        }),
      ],
    }),
  },
};
