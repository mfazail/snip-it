/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: "class",
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {},
    plugins: [require('flowbite/plugin'),require('@tailwindcss/typography')],
};

export default config;
