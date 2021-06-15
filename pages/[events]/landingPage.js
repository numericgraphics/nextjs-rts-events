import React, { useContext, useEffect } from 'react'
import UserContext from '../../hooks/userContext'
import { useRouter } from 'next/router'
import { getAllEvents, getEventsData } from '../../lib/events'
import ThemeFactory from '../../data/themeFactory'
import EventLayout from '../../components/ui/layout/eventLayout'
import Div100vh from 'react-div-100vh'
import { Box, Button, Typography } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/pages/landingPage.style'

function Map (props) {
    const router = useRouter()
    const { store, dataProvider } = useContext(UserContext)
    const { setTheme, setLoading, setEventName, setEventData, isGlobalLoading } = store
    const { events } = router.query
    const { eventData } = props
    const classes = useStyles()

    useEffect(() => {
        if (isGlobalLoading) {
            setLoading(false)
            setEventData(eventData.content)
            setEventName(events)
            dataProvider.setEventData(eventData.content)
            setTheme(ThemeFactory.createTheme(dataProvider.getTheme()))
        } else {
            setLoading(false)
        }
    }, [isGlobalLoading])

    return (
        <React.Fragment>
                <Div100vh className='content'>
                    <Box className={classes.container}>
                        <img src='/landingPageHeaderLogo.png' />
                        <Typography variant='h3' className={classes.textContent} >
                            Distinguez le Vrai du Faux et gagnez de nombreux cadeaux !
                        </Typography>
                    <a className={classes.button} title="Jouer Maintenant" href="rtssport://webview/?path=https://defis.rts.ch/euro?wv=1&shouldTrack=false&allowInlinePlayback=true" target="_blank">Jouer maintenant</a>
                    </Box>
                </Div100vh>
        </React.Fragment>
    )
}
export default Map
export async function getStaticPaths ({ locales }) {
    const eventPaths = await getAllEvents()

    const paths = []
    eventPaths.forEach((path) => {
        locales.forEach((locale) => {
            paths.push({ ...path, locale })
        })
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params, locale }) {
    const eventData = await getEventsData(params.events, locale)
    return {
        props: {
            eventData,
            locale
        },
        revalidate: 1
    }
}
