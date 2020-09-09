import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import Box from '@material-ui/core/Box'
import UserContext from './UserContext'

export const siteTitle = 'TODO:SiteTitle'

const styles = {
    alert: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        backgroundColor: '#409AD3'
    }
}

export default function EventLayout ({ children, home }) {
    const [isLandscape, setOrientation] = useState(false)
    const { dataProvider, store } = useContext(UserContext)
    const { setLoading } = store


    function handleOrientation () {
        setOrientation(window.innerWidth < window.innerHeight)
    }

    // TODO handle resize for redraw  with timeout
    function handleResize () {
        console.log('handleResize')
    }

    useEffect(() => {
        window.addEventListener('orientationchange', handleOrientation)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('orientationchange', handleOrientation)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className={'container'} >
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="TODO"
                />
            </Head>
            {
                isLandscape
                    ? <Box style={styles.alert}>
                        <AutorenewIcon style={{ fontSize: 80 }} />
                    </Box>
                    : <React.Fragment>
                        {/*<Box className="backgroundPadding"/>*/}
                        {children}
                    </React.Fragment>
            }
        </div>
    )
}
