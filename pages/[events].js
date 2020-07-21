import React, { createRef, useContext, useEffect, useState } from 'react'
import Router, { withRouter } from 'next/router'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import UserContext from '../components/UserContext'
import { getAllEvents, getEventsData } from '../lib/events'
import ThemeFactory from '../data/themeFactory'
import hasLoginModal from '../hoc/hasLoginModal'
import InnerHeightLayout from '../components/innerHeightLayout'
import PromosStepper from '../components/promos/promosStepper'
import Promos from '../components/promos/promos'
import EventLayout from '../components/eventLayout'

const useStyles = makeStyles({
    containerOverlayHeader: {
        display: 'flex',
        justifyContent: 'center',
        width: '100vw',
        position: 'absolute',
        zIndex: 2
    },
    containerOverlayFooter: {
        position: 'absolute',
        display: 'flex',
        width: '100vw',
        minHeight: 128,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 1,
        bottom: 30,
        paddingLeft: 30,
        paddingRight: 30
    },
    button: {
        width: '80vw',
        bottom: 20,
        borderRadius: 30,
        alignSelf: 'center',
        fontSize: '1.25rem',
        padding: '6px 20px'
    },
    cg: {
        alignSelf: 'center',
        color: 'white',
        marginBottom: 10,
        fontsize: '0.8125rem'
    },
    cgLink: {
        textAlign: 'center'
    }
})

function Events (props) {
    console.log('Events', props)
    const { eventData, router } = props
    const { content, events } = eventData
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [promos, setPromos] = useState([])
    const [translation, setTranslation] = useState([])
    const { dataProvider, store } = useContext(UserContext)
    const { setTheme, isLoading, setLoading, setEventName } = store
    const layoutRef = createRef()

    async function handleVerify () {
        try {
            const response = await fetch(`api/verify/${events}`)
            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData(content)
                await Router.push('/dashBoard')
            } else {
                initPage()
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    // eslint-disable-next-line no-undef
    useEffect(() => {
        setEventName(events)
        dataProvider.setData(content)
        setTheme(ThemeFactory.createTheme(dataProvider.getTheme()))
        handleVerify().then()
        Router.prefetch('/dashboard').then()
    }, [])

    useEffect(() => {
        setEventName(events)
        dataProvider.setData(eventData.content)
        setTheme(ThemeFactory.createTheme(dataProvider.getTheme()))
        handleVerify().then()
        Router.prefetch('/dashboard').then()
    }, [])

    function initPage () {
        setPromos(dataProvider.getPromos())
        setTranslation(dataProvider.getTranslation())
        handleUrlQuery()
        setActiveStep(0)
        setLoading(false)
    }

    function handleUrlQuery () {
        const { query } = router
        if (query && query.modal === 'true') {
            props.openModal()
        }
    }

    function onStart () {
        props.openModal()
    }

    function slideIndexCallBack (index) {
        setActiveStep(index)
    }

    return (
        <EventLayout>
            {isLoading
                ? null
                : <InnerHeightLayout ref={layoutRef}>
                    <Box className={classes.containerOverlayHeader} >
                        <PromosStepper steps={promos} activeStep={activeStep}/>
                    </Box>
                    <Box className={classes.containerOverlayFooter} >
                        <Button color="primary" variant="contained" className={classes.button} onClick={onStart}>
                            {translation.startPageButtonText}
                        </Button>
                        <Link href={dataProvider.getAllData().cguURL} className={classes.cgLink}>
                            <Typography variant="caption" className={classes.cg}>{translation.lireCGUText}</Typography>
                        </Link>
                    </Box>
                    <Promos data={promos} indexCallBack={slideIndexCallBack}/>
                </InnerHeightLayout>
            }
        </EventLayout>
    )
}

export default withRouter(hasLoginModal(Events))

export async function getStaticPaths () {
    const paths = await getAllEvents()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params }) {
    const eventData = await getEventsData(params.events)
    return {
        props: {
            eventData
        }
    }
}
