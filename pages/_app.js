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
try {
    console.log('APP - add beforeinstallprompt event');
    let installPromptEvent;
    window.addEventListener('beforeinstallprompt', (event) => {
        console.log('beforeinstallprompt - event dispatched', event);
        event.preventDefault();
        installPromptEvent = event;
    });
} catch (error) {
    console.log('beforeinstallprompt - error', error);
}


export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}
