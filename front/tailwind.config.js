/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#08163c",
                yellow: "#FCC453",
                "dark-blue": "#08163c",
                blue: "#0b65e3",
            },
        },
    },

    plugins: [require("daisyui")],
};
