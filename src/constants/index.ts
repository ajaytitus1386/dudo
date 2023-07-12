import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()

export const WEBSOCKET_URL =
    publicRuntimeConfig.BACKEND_URL || "http://localhost:5000"

export const BACKEND_URL =
    publicRuntimeConfig.BACKEND_URL || "http://localhost:5000"
