/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-blue': '#00f2ff',
                'neon-purple': '#bc13fe',
                'neon-green': '#39ff14',
                'cyber-charcoal': '#121212',
                'cyber-cyan': '#00E5FF',
                'cyber-purple': '#7000FF',
            },
            fontFamily: {
                'futuristic': ['Orbitron', 'sans-serif'],
                'sans': ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
