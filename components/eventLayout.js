import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

export const siteTitle = 'TODO:SiteTitle'

const useStyles = makeStyles({
    root: {
        background: '#333',
        border: 0,
        color: '#fff',
        width: '100vw',
        margin: '0 auto 0',
        minHeight: '25rem'
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
    const classes = useStyles()

    useEffect(() => {
        window.addEventListener('orientationchange', () => {
            setOrientation(window.innerWidth < window.innerHeight)
        })
    }, [])

    return (
        <div className={classes.root}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="TODO"
                />
            </Head>
            <header className={classes.header}>
                {home && (
                    <h1 className={utilStyles.heading2Xl}>Events by {' '}
                        <a href="https://www.rts.ch">RTS</a>
                    </h1>
                )}
            </header>
            {
                isLandscape
                    ? <Box style={styles.alerte}>
                        <Typography variant="body1" style={styles.alerteTypo}>Pour une meilleur utilisation veuillez utiliser le mode portrait, merci</Typography>
                    </Box>
                    : <main>{children}</main>
            }
        </div>
    )
}
