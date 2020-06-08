import React, { useEffect, useState } from 'react'
import getConfig from 'next/config'
import fetch from 'node-fetch'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import EventLayout from '../components/eventLayout'
import Gifts from '../components/gifts'
import GiftsStepper from '../components/giftsStepper'
import mockData from '../mock/config.json'
import Typography from '@material-ui/core/Typography'

const { publicRuntimeConfig } = getConfig()
const { API_URL, USE_MOCK } = publicRuntimeConfig
const dev = API_URL === 'dev'
export const server = dev ? 'http://localhost:3000' : 'https://web-front-v3-git-feature-first-view.rtsch.now.sh'

const loadingElement = <div><p style={{ textAlign: 'center' }}> Loading process ! </p></div>
const styles = {
    slideHeader: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        top: 0,
        padding: '20px',
        width: '100%',
        minHeight: '30vh',
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
        backgroundSize: '100%',
        minHeight: '20vh',
        zIndex: 3
    },
    containerOverlay: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        bottom: 0,
        zIndex: 1
    },
    button: {
        bottom: 20,
        borderRadius: 20,
        backgroundColor: '#AF001E'
    }
}

function Index (props) {
    const [activeStep, setActiveStep] = useState(0)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setActiveStep(0)
        setLoading(false)
    }, [])

    function slideIndexCallBack (index) {
        setActiveStep(index)
    }

    return (
        <EventLayout>
            { isLoading
                ? loadingElement
                : <Box>
                    <Container style={styles.slideHeader}>
                        <Box style={{ ...styles.slideLogo, backgroundImage: `url(${props.data.logoUrl})` }}/>
                        <Box style={styles.slideDescription}>
                            <Typography variant="body1" style={styles.slideDescriptionType}>{props.data.description}</Typography>
                        </Box>
                    </Container>
                    <Container style={styles.containerOverlay} >
                        <GiftsStepper steps={props.data.gifts} activeStep={activeStep}/>
                        <Button variant="contained" color="secondary" style={styles.button}>
                            Commencer
                        </Button>
                    </Container>
                    <Gifts data={props.data.gifts} indexCallBack={slideIndexCallBack}/>
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
                const response = await fetch('https://zhihvqheg7.execute-api.eu-central-1.amazonaws.com/latest/events/NIFFF')
                data = await response.json()
            } catch (err) {
                data = { message: 'no-data' }
            }
        }

        return {
            props: {
                data
            }
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export default Index
