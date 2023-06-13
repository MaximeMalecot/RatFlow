/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            yellow: "#FCC453",
        },
    },
    plugins: [require("daisyui")],
};
