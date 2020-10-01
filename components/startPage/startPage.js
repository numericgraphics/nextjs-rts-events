import React, { useContext, useEffect, useState } from 'react'
import { isBrowser, isMobile, isTablet } from 'react-device-detect'
import Button from '@material-ui/core/Button'
import SwipeableTemplates from './swipeableTemplates'
import UserContext from '../UserContext'
import hasLoginModal from '../../hoc/hasLoginModal'
import SlideShow from './slideShow'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowIcon } from '../../data/icon'
import Slide from '@material-ui/core/Slide/Slide'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'

const useStyles = makeStyles({
    containerIcon: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%'
    },
    arrowSwipeDown: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    arrowSwipeDownMobile: {
        zIndex: -2
    },
    arrowSwipeDownDesktop: {
        zIndex: 2
    },
    button: {
        zIndex: 2
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
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    label: {
        position: 'relative',
        color: 'white'
    }

})

const CustomSvgButton = props => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <ArrowIcon/>
            <Typography className={[classes.label, 'regular-1', 'color-White'].join(' ')} align={'center'}>{props.label}</Typography>
        </div>
    )
}

function StartPage (props) {
    const classes = useStyles()
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
        setStartPageElements(dataProvider.getStartPageElements())
        setTranslation(dataProvider.getTranslation())
        setActiveStep(0)
        handleUrlQuery()
    }, [])

    return (
        <React.Fragment>
            <Box className='content'>
                <Box className={['bottomZonePromo', classes.arrowSwipeDownDesktop].join(' ')}>
                    {isLastTemplate() &&
                    <Slide direction="up" in={isLastTemplate()} timeout={300} mountOnEnter unmountOnExit>
                        <Button color="primary"
                            variant="contained"
                            className={['bottomButton', 'bottom-1-rem', classes.button].join(' ')}
                            onClick={onStart}
                            style={{ filter: props.isModalOpen ? 'blur(4px)' : 'none' }}>
                            {translation.startPageButtonText}
                        </Button>
                    </Slide>
                    }
                </Box>
                {isMobile &&
                    <Box className='bottomZonePromo'>
                        {!isLastTemplate() &&
                        <Box className={[classes.arrowSwipeDown, classes.arrowSwipeDownMobile].join(' ')}>
                            <ArrowIcon/>
                            <Typography className={['regular-1', 'color-White'].join(' ')} align={'center'}>{translation.startPageArrowDown}</Typography>
                        </Box>
                        }
                    </Box>}
                {(isBrowser && !isTablet) &&
                <Box className={['bottomZonePromo', classes.arrowSwipeDownDesktop].join(' ')}>
                    {!isLastTemplate() &&
                    <ButtonBase disableRipple={true} onClick={onSwipe}>
                        <CustomSvgButton label={translation.startPageArrowDown} />
                    </ButtonBase>
                    }
                </Box>}
            </Box>
            {length > 0 &&
            <React.Fragment>
                <SwipeableTemplates index={activeStep} className='fadeInAnimation' data={startPageElements} indexCallBack={slideIndexCallBack} isModalOpen={props.isModalOpen}/>
                <SlideShow
                    slides={startPageElements}
                    activeSlide={activeStep}
                    isModalOpen={props.isModalOpen}
                />
            </React.Fragment>
            }
        </React.Fragment>
    )
}

export default hasLoginModal(StartPage)
