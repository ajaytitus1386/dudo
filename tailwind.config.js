const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // Lower values have less height, hierarchy and unique
            colors: {
                primary: {
                    light: {
                        100: "#7CAADF",
                        200: "#5B95D7",
                        300: "#2C6CB5",
                        400: "#245894",
                        500: "#1C4473",
                    },
                    dark: {
                        100: "#737579",
                        200: "#5a5c60",
                        300: "#424449",
                        400: "#2b2e33",
                        500: "#16191e",
                    },
                },
                secondary: {
                    light: {
                        100: "#7e06ef",
                        200: "#6905C7",
                        300: "#5F05B3",
                        400: "#54049F",
                        500: "#4A048B",
                    },
                    dark: {
                        100: "#3D3D3D",
                        200: "#333333",
                        300: "#262626",
                        400: "#1F1F1F",
                        500: "#141414",
                    },
                },
                text: {
                    light: {
                        100: "#FFF",
                        200: "#d1d5db",
                        300: "#6b7280",
                        400: "#1f2937",
                        500: "#000",
                        DEFAULT: "#000",
                    },
                    dark: {
                        100: "#000",
                        200: "#DEE2E6",
                        300: "#ADB5BD",
                        400: "#495057",
                        500: "#FFF",
                        DEFAULT: "#FFF",
                    },
                },
                negative: {
                    light: {
                        DEFAULT: colors.red[500],
                    },
                    dark: {
                        DEFAULT: colors.red[300],
                    },
                },
                positive: {
                    light: {
                        DEFAULT: colors.green[500],
                    },
                    dark: {
                        DEFAULT: colors.green[200],
                    },
                },
                background: {
                    light: {
                        DEFAULT: "#FFF",
                        100: "#f8f9fa",
                        200: "#e9ecef",
                        300: "#dee2e6",
                        400: "#ced4da",
                        500: "#adb5bd",
                    },
                    dark: {
                        DEFAULT: "#000",
                        100: colors.gray[900],
                        200: colors.gray[800],
                        300: colors.gray[700],
                        400: colors.gray[600],
                        500: colors.gray[500],
                    },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                ellipsis: "ellipsis steps(4,end) 1s infinite",
                pop_in: "pop_in 0.2s ease-in-out",
            },
            keyframes: {
                pop_in: {
                    "0%": { transform: "scale(0.75)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                ellipsis: {
                    "0%": { width: "0" },
                    "50%": { width: "1.25em" },
                    "100%": { width: "0" },
                },
            },
        },
    },
    plugins: [],
}
