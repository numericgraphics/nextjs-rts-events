import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

/*
 SOURCE : https://github.com/mui-org/material-ui/tree/next/examples/nextjs
 */

export default class MyDocument extends Document {
    render () {
        return (
            <Html>
                <Head>
                    <title>Radio Télévision Suisse - Popquiz</title>
                    < meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
                    <meta
                        name="description"
                        content="RTS Events"
                    />
                    <script src="https://www.rts.ch/js/tools/stats-external.js" async/>
                    <link rel='shortcut icon' href='/favicon.ico' />

                    <link href="/icons/touch-icon-iphone.png" rel="apple-touch-icon"/>
                    <link href="/icons/touch-icon-ipad.png" rel="apple-touch-icon" sizes="76x76"/>
                    <link href="/icons/touch-icon-iphone-retina.png" rel="apple-touch-icon" sizes="120x120"/>
                    <link href="/icons/touch-icon-ipad-retina.png" rel="apple-touch-icon" sizes="152x152"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
        })

    const initialProps = await Document.getInitialProps(ctx)

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
    }
}
