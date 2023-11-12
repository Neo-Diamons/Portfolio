/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            dropShadow: {
                glow: [
                    "0 0px  5px rgba(255,255, 255, 0.35)",
                    "0 0px 10px rgba(255, 255,255, 0.2)"
                ],
            }
        }
    },
    plugins: [],
};
