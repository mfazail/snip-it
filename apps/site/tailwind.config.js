/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: "class",
    content: [
        "./src/**/*.{html,js,svelte,ts}",
    ],
    theme: {},
    plugins: [require('@tailwindcss/typography')],
};

export default config;
