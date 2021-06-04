import React, { useContext, useEffect, useState } from 'react'
import { isBrowser, isMobile, isTablet } from 'react-device-detect'
import Button from '@material-ui/core/Button'
import SwipeableTemplates from '../startPage/swipeableTemplates'
import UserContext from '../../hooks/userContext'
import SlideShow from '../startPage/slideShow'
import { Box } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/pages/dailyPromoModal.style'
import { ArrowIcon } from '../../data/icon'
import Slide from '@material-ui/core/Slide/Slide'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

function DailyPromo (props) {
    const classes = useStyles()
    const { isDailyPromo, dailyPromo, closeModal } = props
    const [activeStep, setActiveStep] = useState(0)
    const [startPageElements, setStartPageElements] = useState([])
    const { length } = startPageElements
    const [translation, setTranslation] = useState([])
    const { dataProvider } = useContext(UserContext)

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

    function isLastTemplate () {
        return activeStep === (length - 1 <= 0 ? 0 : length - 1)
    }

    function onSwipe () {
        setActiveStep(activeStep => activeStep + 1)
    }

    useEffect(() => {
        if (isDailyPromo) {
            setStartPageElements(dailyPromo)
            setTranslation(dataProvider.getTranslation())
            setActiveStep(0)
        } else {
            setStartPageElements(dataProvider.getStartPageElements())
            setTranslation(dataProvider.getTranslation())
            setActiveStep(0)
            handleUrlQuery()
        }
    }, [])

    return (
        <React.Fragment>
            <Box className='content' style={isDailyPromo && { width: '100%' }}>
                <Box className={['bottomZonePromo', classes.arrowSwipeDownDesktop].join(' ')}>
                    {isLastTemplate() &&
                    <Slide direction="up" in={isLastTemplate()} timeout={300} mountOnEnter unmountOnExit>
                        <Button color="secondary"
                            variant="contained"
                            className={['button', classes.button].join(' ')}
                            onClick={closeModal}
                            // style={{ filter: props.isModalOpen ? 'blur(4px)' : 'none' }}
                        >
                            {translation.dailyElementsButtonText}
                        </Button>
                    </Slide>
                    }
                </Box>
                {isMobile &&
                    <Box className='bottomZonePromo' style={{ zIndex: 2 }}>
                        {!isLastTemplate() &&
                        <Box className={[classes.arrowSwipeDown, classes.arrowSwipeDownMobile].join(' ')}>
                            <ArrowIcon/>
                            <Typography variant="subtitle2" className={'color-White'} align={'center'}>{translation.startPageArrowDown}</Typography>
                        </Box>
                        }
                    </Box>}
                {(isBrowser && !isTablet) &&
                <Box className={['bottomZonePromo', classes.arrowSwipeDownDesktop].join(' ')}>
                    {!isLastTemplate() &&
                        <React.Fragment>
                            <IconButton disableRipple={true} onClick={onSwipe} className={classes.buttonSwipeDownDesktop}>
                                <ArrowIcon fontSize="large"/>
                            </IconButton>
                            <Typography variant="subtitle2" className={[classes.label, 'color-White'].join(' ')} align={'center'}>{translation.startPageArrowDown}</Typography>
                        </React.Fragment>
                    }
                </Box>}
            </Box>
            {length > 0 &&
            <React.Fragment>
                <SwipeableTemplates isInModal={true} index={activeStep} className='fadeInAnimation' data={startPageElements} indexCallBack={slideIndexCallBack} isModalOpen={props.isModalOpen}/>
                <SlideShow
                    promoInModal={true}
                    slides={startPageElements}
                    activeSlide={activeStep}
                    isModalOpen={props.isModalOpen}
                />
            </React.Fragment>
            }
        </React.Fragment>
    )
}

export default DailyPromo
