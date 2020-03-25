import NextDocument, { Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
    render() {
        return (
            <html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&family=Sen:wght@400;700;800&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
