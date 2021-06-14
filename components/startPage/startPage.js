import React, { useContext, useEffect, useState } from 'react'
import { isBrowser, isMobile, isTablet } from 'react-device-detect'
import Button from '@material-ui/core/Button'
import SwipeableTemplates from './swipeableTemplates'
import UserContext from '../../hooks/userContext'
import hasLoginModal from '../../hoc/hasLoginModal'
import SlideShow from './slideShow'
import { Box } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/pages/startPage.style'
import { ArrowIcon } from '../../data/icon'
import Slide from '@material-ui/core/Slide/Slide'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

function StartPage (props) {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [startPageElements, setStartPageElements] = useState([])
    const { length } = startPageElements
    const [translation, setTranslation] = useState([])
    const { dataProvider } = useContext(UserContext)
    const queryParams = (new URL(document.location)).searchParams

    console.log(queryParams)



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
                        <Button color="secondary"
                            variant="contained"
                            className={['button', classes.button].join(' ')}
                            onClick={onStart}
                            // style={{ filter: props.isModalOpen ? 'blur(4px)' : 'none' }}
                        >
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
