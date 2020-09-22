import React, { useEffect } from 'react'
import Head from 'next/head'

export const siteTitle = 'TODO:SiteTitle'

export default function EventLayout ({ children, home }) {
    // TODO handle resize for redraw  with timeout
    function handleResize () {
        console.log('handleResize')
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className={'container'} >
            <Head>
                <link rel="icon" href="/favicon.ico" />
                < meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
                <meta
                    name="description"
                    content="TODO"
                />
            </Head>
            {
                <React.Fragment>
                    {/* <Box className="backgroundPadding"/> */}
                    {children}
                </React.Fragment>
            }
        </div>
    )
}
