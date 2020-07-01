import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import UserContext from './UserContext'

export const siteTitle = 'TODO:SiteTitle'

const useStyles = makeStyles({
    root: {
        backgroundColor: 'gray',
        border: 0,
        color: '#fff',
        width: '100vw',
        margin: '0 auto 0'
        // minHeight: '100vh'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'

    }
})

const styles = {
    alerte: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        backgroundColor: '#409AD3'
    },
    alerteTypo: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    }
}

export default function EventLayout ({ children, home }) {
    const [isLandscape, setOrientation] = useState(false)
    const [viewportHeight, setViewportHeight] = useState(false)
    const classes = useStyles()
    const { dataProvider } = useContext(UserContext)

    function setGlobalInnerHeight () {
        setViewportHeight(window.innerHeight)
        dataProvider.innerHeight = window.innerHeight
    }

    useEffect(() => {
        setGlobalInnerHeight()
        window.addEventListener('orientationchange', () => {
            setOrientation(window.innerWidth < window.innerHeight)
            setGlobalInnerHeight()
        })
    }, [])

    return (
        <div className={classes.root} >
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="TODO"
                />
            </Head>
            {
                isLandscape
                    ? <Box style={styles.alerte}>
                        <Typography variant="body1" style={styles.alerteTypo}>Pour une meilleur utilisation veuillez utiliser le mode portrait, merci</Typography>
                    </Box>
                    : <main style={{ minHeight: viewportHeight }}>{children}</main>
            }
        </div>
    )
}
