import React from 'react'
import getConfig from 'next/config'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
const { serverRuntimeConfig } = getConfig()
/*
 SOURCE : https://github.com/mui-org/material-ui/tree/next/examples/nextjs
 */
export default class MyDocument extends Document {
    constructor (props) {
        super(props)
        const { __NEXT_DATA__, ids } = props
        const { query } = __NEXT_DATA__
        const { IMAGE_BASE_URL } = serverRuntimeConfig

        if (ids) {
            __NEXT_DATA__.ids = ids
        }

        try {
            this.query = query
            this.data = __NEXT_DATA__
            this.iconUrl = `${IMAGE_BASE_URL}/icons/${query.events}`
            this.manifestUrl = `${IMAGE_BASE_URL}/manifests/${query.events}`
        } catch (e) {
            console.log('MyDocument constructor - error', e)
        }
    }

    render () {
        return (
            <Html>
                <Head>
                    <script src="https://www.rts.ch/js/tools/stats-external.js" async/>
                    <link rel='shortcut icon' href='/favicon.ico' />

                    <link href={`${this.iconUrl}/touch-icon-iphone.png`} rel="apple-touch-icon"/>
                    <link href={`${this.iconUrl}/touch-icon-ipad.png`} rel="apple-touch-icon" sizes="76x76"/>
                    <link href={`${this.iconUrl}/touch-icon-iphone-retina.png`} rel="apple-touch-icon" sizes="120x120"/>
                    <link href={`${this.iconUrl}/touch-icon-ipad-retina.png`} rel="apple-touch-icon" sizes="152x152"/>

                    <link rel='manifest' href={`${this.manifestUrl}/manifest.json`} />
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
