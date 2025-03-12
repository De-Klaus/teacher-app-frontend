/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@shadcn/ui/dist/**/*.js" // Добавляем поддержку ShadCN
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};