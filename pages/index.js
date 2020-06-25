import React, { useContext, useEffect, useState } from 'react'
import getConfig from 'next/config'
import mockData from '../mock/config'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import PromosStepper from '../components/promos/promosStepper'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Promos from '../components/promos/promos'
import EventLayout from '../components/eventLayout'
import UserContext from '../components/UserContext'
import hasLoginModal from '../hoc/hasLoginModal'
import Progress from '../components/progress'
import Router from 'next/router'
import withStyles from '@material-ui/core/styles/withStyles'

const { publicRuntimeConfig } = getConfig()
const { API_URL, USE_MOCK } = publicRuntimeConfig
const dev = API_URL === 'dev'
export const server = dev ? 'http://localhost:3000' : 'https://web-front-v3-git-feature-first-view.rtsch.now.sh'
const useStyles = makeStyles({
    slideGlobal: {
        display: 'flex',
        flexDirection: 'column'
    },
    slideHeader: {
        position: 'relative',
        display: 'flex',
        flexShrink: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        top: 0,
        width: '100%',
        height: '30vh',
        zIndex: 2,
        backgroundColor: '#409AD3'
    },
    slideDescription: {
        textAlign: 'center'
    },
    slideDescriptionType: {
        fontFamily: 'srgssr-type-Rg',
        color: 'white'
    },
    slideLogo: {
        color: 'white',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '50%',
        minHeight: '10vh',
        zIndex: 3
    },
    containerOverlayHeader: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        top: 0,
        zIndex: 2
    },
    containerOverlayFooter: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
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

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#707070'),
        backgroundColor: '#707070',
        '&:hover': {
            backgroundColor: '#505050'
        }
    }
}))(Button)

function Index (props) {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [promos, setPromos] = useState([])
    const [translation, setTranslation] = useState([])
    const [isLoading, setLoading] = useState(true)
    const { dataProvider } = useContext(UserContext)

    async function handleVerify () {
        try {
            const response = await fetch('/api/verify')
            if (response.status === 200) {
                await Router.push('/dashBoard')
            } else {
                initStartPage()
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    useEffect(() => {
        handleVerify().then()
    }, [])

    function initStartPage () {
        setPromos(dataProvider.getPromos())
        setTranslation(dataProvider.getTranslation())
        setActiveStep(0)
        setLoading(false)
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
                ? <Progress/>
                : <Box className={classes.slideGlobal}>
                    <Container className={classes.containerOverlayHeader} >
                        <PromosStepper steps={promos} activeStep={activeStep}/>
                    </Container>
                    <Container className={classes.containerOverlayFooter} >
                        <ColorButton variant="contained" className={classes.button} onClick={onStart}>
                            {translation.startPageButtonText}
                        </ColorButton>
                        <Link href={dataProvider.getAllData().cguURL} className={classes.cgLink}>
                            <Typography variant="caption" className={classes.cg}>{translation.lireCGUText}</Typography>
                        </Link>
                    </Container>
                    <Promos data={promos} indexCallBack={slideIndexCallBack}/>
                </Box>
            }
        </EventLayout>
    )
}

export async function getStaticProps () {
    try {
        let data
        if (USE_MOCK) {
            data = mockData
        } else {
            try {
                const response = await fetch('https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/WF')
                data = await response.json()
            } catch (err) {
                data = { message: 'no-data' }
            }
        }

        return {
            props: {
                eventData: data
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export default hasLoginModal(Index)
