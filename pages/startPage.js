import React, { useEffect, useState, useContext } from 'react'
import getConfig from 'next/config'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import EventLayout from '../components/eventLayout'
import Promos from '../components/promos/promos'
import PromosStepper from '../components/promos/promosStepper'
import Typography from '@material-ui/core/Typography'
import UserContext from '../components/UserContext'

const { publicRuntimeConfig } = getConfig()
const { API_URL } = publicRuntimeConfig
const dev = API_URL === 'dev'
export const server = dev ? 'http://localhost:3000' : 'https://web-front-v3-git-feature-first-view.rtsch.now.sh'

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
    const [promos, setPromos] = useState([])
    const [translation, setTranslation] = useState([])
    const { dataProvider } = useContext(UserContext)

    useEffect(() => {
        console.log('StartPage - dataProvider', dataProvider)
        setPromos(dataProvider.getPromos())
        setTranslation(dataProvider.getTranslation())
        setActiveStep(0)
    }, [])

    function slideIndexCallBack (index) {
        setActiveStep(index)
    }

    return (
        <EventLayout>
            <Box style={styles.slideGlobal}>
                <Container style={styles.containerOverlay} >
                    <PromosStepper steps={promos} activeStep={activeStep}/>
                    <Button variant="contained" color="secondary" style={styles.button}>
                        {translation.startPageButtonText}
                    </Button>
                    <Typography variant="caption" style={styles.cg}>{translation.lireCGUText}</Typography>
                </Container>
                <Promos data={promos} indexCallBack={slideIndexCallBack}/>
            </Box>
        </EventLayout>
    )
}

export default StartPage
