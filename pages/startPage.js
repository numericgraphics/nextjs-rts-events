import React, { useEffect, useState, useContext } from 'react'
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
import UserContext from '../components/UserContext'

const { publicRuntimeConfig } = getConfig()
const { API_URL, USE_MOCK } = publicRuntimeConfig
const dev = API_URL === 'dev'
export const server = dev ? 'http://localhost:3000' : 'https://web-front-v3-git-feature-first-view.rtsch.now.sh'

const loadingElement = <div><p style={{ textAlign: 'center' }}> Loading process ! </p></div>
const styles = {
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
    containerOverlay: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        bottom: 0,
        zIndex: 1
    },
    button: {
        width: '80vw',
        bottom: 10,
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: '#AF001E'
    },
    cg: {
        alignSelf: 'center',
        color: 'white',
        marginBottom: 10
    }
}

// TODO USE COLOR CODE AND STYLE WITH USERCONTEXT
function StartPage (props) {
    const [activeStep, setActiveStep] = useState(0)
    const [isLoading, setLoading] = useState(true)
    //
    const { dataEvent } = useContext(UserContext)

    useEffect(() => {
        console.log('StartPage - useEffect dataEvent', dataEvent)
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
                : <Box style={styles.slideGlobal}>
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
                        <Typography variant="caption" style={styles.cg}>{props.data.cg}</Typography>
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

export default StartPage
