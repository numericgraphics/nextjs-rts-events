//import React from 'react';
//import App from 'next/app';

import '../styles/global.css'
import 'typeface-roboto'

//import { AnimatePresence } from 'framer-motion';

/*
class MyApp extends App {
    render() {
        const { Component, pageProps, router } = this.props;

        return (
            <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route} />
            </AnimatePresence>
        );
    }
}

export default MyApp;
*/


export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}
