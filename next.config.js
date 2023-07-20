/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        BACKEND_URL:
            process.env.NODE_ENV === "production"
                ? process.env.BACKEND_URL
                : "https://dudo-api.fly.dev/",
    },
}

module.exports = nextConfig
