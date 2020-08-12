import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import UserContext from './UserContext'
import { useHeight } from '../hooks/useHeight'

export const siteTitle = 'TODO:SiteTitle'

const useStyles = makeStyles({
    root: {
        border: 0,
        color: '#fff',
        width: '100vw',
        margin: '0 auto 0'
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
    const { dataProvider } = useContext(UserContext)
    const height = useHeight()

    function setGlobalInnerHeight () {
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
                        <AutorenewIcon style={{ fontSize: 80 }} />
                    </Box>
                    : <main style={{ minHeight: height }}>{children}</main>
            }
        </div>
    )
}
