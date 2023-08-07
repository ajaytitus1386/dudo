import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="icon" type="image/png" href="/favicon.png" />
            <title>Liar&apos;s Dice</title>
            <meta
                name="description"
                content="A simple website to play Liar's Dice with your friends online."
            />
            <meta property="og:title" content="Liar's Dice" />
            <meta
                property="og:description"
                content="A simple website to play Liar's Dice with your friends online."
            />
            <meta property="og:image" content="/favicon.png" />
            <meta property="og:url" content="https://dudo.ajaytitus.com" />
            <meta property="og:type" content="website" />
            {/* Cloudflare Web Analytics */}
            <script
                defer
                src="https://static.cloudflareinsights.com/beacon.min.js"
                data-cf-beacon='{"token": "d5a4d5b2535843119471fcc0e11211c7"}'
            ></script>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
