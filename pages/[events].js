import React, { createRef, useContext, useEffect, useState } from 'react'
import { withRouter } from 'next/router'
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
import Fade from '@material-ui/core/Fade/Fade'

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
    const { eventData, router } = props
    const { content, events } = eventData
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [promos, setPromos] = useState([])
    const [translation, setTranslation] = useState([])
    const { dataProvider, store } = useContext(UserContext)
    const { setTheme, isLoading, setLoading, setEventName, setEventData, isGlobalLoading } = store
    const layoutRef = createRef()

    async function handleVerify () {
        try {
            const response = await fetch(`api/verify/${events}`)
            if (response.status === 200) {
                const content = await response.json()
                dataProvider.setData(content)
                await router.push(`/${events}/dashBoard`)
            } else {
                initPage()
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    useEffect(() => {
        setEventData(content)
        setEventName(events)
        dataProvider.setData(content)
        setTheme(ThemeFactory.createTheme(dataProvider.getTheme()))
        handleVerify().then()
    }, [])

    useEffect(() => {
        if (!isGlobalLoading) {
            setLoading(false)
            handleUrlQuery()
        }
    }, [isGlobalLoading])

    function initPage () {
        setPromos(dataProvider.getPromos())
        setTranslation(dataProvider.getTranslation())
        setActiveStep(0)
    }

    function handleUrlQuery () {
        const params = (new URL(document.location)).searchParams
        if (params.get('modal')) {
            setTimeout(() => {
                props.openModal()
            }, 1000)
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
                : <InnerHeightLayout ref={layoutRef} style={{ filter: props.isModalOpen ? 'blur(4px)' : 'none' }}>
                    <Fade in={!isLoading} timeout={500}>
                        <Box className={classes.containerOverlayHeader} >
                            <PromosStepper steps={promos} activeStep={activeStep}/>
                        </Box>
                    </Fade>
                    <Fade in={!isLoading} timeout={500}>
                        <Box className={classes.containerOverlayFooter} >
                            <Button color="primary" variant="contained" className={classes.button} onClick={onStart}>
                                {translation.startPageButtonText}
                            </Button>
                            <Link href={dataProvider.getAllData().cguURL} className={classes.cgLink}>
                                <Typography variant="caption" className={classes.cg}>{translation.lireCGUText}</Typography>
                            </Link>
                        </Box>
                    </Fade>
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
