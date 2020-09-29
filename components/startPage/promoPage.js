/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Promos from './promos'
import UserContext from '../UserContext'
import hasLoginModal from '../../hoc/hasLoginModal'
import SlideShow from './slideShow'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowIcon } from '../../data/icon'
import { useHeight } from '../../hooks/useHeight'
import Slide from '@material-ui/core/Slide/Slide'

const useStyles = makeStyles({
    containerIcon: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',


    },
    icon: {
        width: '100%',
        zIndex: -2
    },
    slide: {
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        transition: '.3s ease'
    },
    slideActive: {
        opacity: 1,
        transitionDuration: '.2s'
    }
})

function PromoPage (props) {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [promos, setPromos] = useState([])
    const [translation, setTranslation] = useState([])
    const { dataProvider, store } = useContext(UserContext)
    const { isLoading } = store
    const height = useHeight()

    function onStart () {
        props.openModal()
    }

    function slideIndexCallBack (index) {
        setActiveStep(index)
    }

    function handleUrlQuery () {
        const params = (new URL(document.location)).searchParams
        if (params.get('modal')) {
            setTimeout(() => {
                props.openModal()
            }, 2000)
        }
    }

    useEffect(() => {
        setPromos(dataProvider.getPromos())
        setTranslation(dataProvider.getTranslation())
        setActiveStep(0)
        handleUrlQuery()
    }, [])

    // TODO - remove blur for testing
    return (
        <React.Fragment>
            <Promos className='fadeInAnimation' data={promos} indexCallBack={slideIndexCallBack} isModalOpen={props.isModalOpen}/>
            <Box className='content'>
                <Box className='bottomZonePromo'>
                    {activeStep === promos.length -1
                        ? <Slide direction="up" in={activeStep === promos.length -1} timeout={300} mountOnEnter unmountOnExit>
                            <Button color="primary" variant="contained" className={['bottomButton', 'bottom-2-rem'].join(' ')} onClick={onStart}>
                                {translation.startPageButtonText}
                             </Button>
                        </Slide>
                        : <ArrowIcon/>}


                </Box>
            </Box>
            <SlideShow slides={promos}
                       activeSlide={activeStep}
                       isModalOpen={props.isModalOpen}
                       />
        </React.Fragment>
    )
}

export default hasLoginModal(PromoPage)
