import "../styles/globals.css"
import type { AppProps } from "next/app"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPaperPlane, faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/Layout"

library.add(faPaperPlane, faArrowsRotate)

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
