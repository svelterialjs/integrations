const svelterial = require('vite-plugin-svelte-svelterial');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: () => ({
      plugins: [
        svelterial({
          variables: {
            Component: {
              color: 'red',
            },
          },
        }),
      ],
    }),
  },
};
