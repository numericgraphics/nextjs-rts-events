/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import SwipeableTemplates from './swipeableTemplates'
import UserContext from '../UserContext'
import hasLoginModal from '../../hoc/hasLoginModal'
import SlideShow from './slideShow'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowIcon } from '../../data/icon'
import { useHeight } from '../../hooks/useHeight'
import Slide from '@material-ui/core/Slide/Slide'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    containerIcon: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%'
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

function StartPage (props) {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [promos, setPromos] = useState([])
    const [startPageElements, setStartPageElements] = useState([])
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
        setStartPageElements(dataProvider.getStartPageElements())
        setPromos(dataProvider.getPromos())
        setTranslation(dataProvider.getTranslation())
        setActiveStep(0)
        handleUrlQuery()
    }, [])

    // TODO - remove blur for testing
    return (
        <React.Fragment>
            <SwipeableTemplates className='fadeInAnimation' data={startPageElements} indexCallBack={slideIndexCallBack} isModalOpen={props.isModalOpen}/>
            <Box className='content'>
                <Box className='bottomZonePromo'>
                    {activeStep === startPageElements.length -1
                        ? <Slide direction="up" in={activeStep === startPageElements.length -1} timeout={300} mountOnEnter unmountOnExit>
                            <Button color="primary" variant="contained" className={['bottomButton', 'bottom-1-rem'].join(' ')} onClick={onStart}>
                                {translation.startPageButtonText}
                             </Button>
                        </Slide>
                        : <React.Fragment>
                            <ArrowIcon/>
                            <Typography className={['regular-1', 'color-White'].join(' ')} align={'center'}>Défiler</Typography>
                        </React.Fragment>
                    }


                </Box>
            </Box>
            <SlideShow slides={startPageElements}
                       activeSlide={activeStep}
                       isModalOpen={props.isModalOpen}
                       />
        </React.Fragment>
    )
}

export default hasLoginModal(StartPage)
