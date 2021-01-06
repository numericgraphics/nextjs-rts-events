import React /* , { useEffect, useRef, useState } */, { useContext, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/jsx/pages/questions.style'
import QuestionTimer from '../ui/progress/questionTimer'
import UserContext from '../../hooks/userContext'
import Typography from '@material-ui/core/Typography'
import ImageCapture from '../ui/image/ImageCapture'
import ThemeFactory from '../../data/themeFactory'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { ColorCard } from '../ui/card/ColorCard'
import CardContent from '@material-ui/core/CardContent'
import { ColorBorderButton } from '../ui/button/ColorBorderButton'
import Button from '@material-ui/core/Button'

const questionStates = Object.freeze({
    CAMERA: 'camera',
    PHOTO_VALIDATION: 'photoValidation',
    PHOTO_INVALID: 'photoInvalid'
})

function QuestionImage (props) {
    const classes = useStyles()
    const { title, duration } = props.content
    const [progress, setProgress] = useState(0)
    const [timeLeft, setTimeLeft] = useState(duration)
    const [questionState, setQuestionState] = useState(questionStates.CAMERA)
    // eslint-disable-next-line no-unused-vars
    const [tempRawImage, setTempRawImage] = useState(null)
    const { store } = useContext(UserContext)
    const { videoController } = store
    const [height, setHeight] = useState()
    const [theme, setTheme] = useState({})

    useEffect(() => {
        setTheme(ThemeFactory.getCreatedTheme())
        setHeight(window.innerHeight)
    }, [])

    useEffect(() => {
        if (progress >= 100) {
            setTimeLeft(0)
            setProgress(0)
        }
    }, [progress])

    useEffect(() => {
        console.log(questionState)
        if (questionState === questionStates.CAMERA) {
            // set blur False
            props.setColor(false)
            props.setBlur(false)
        } else if (questionState === questionStates.PHOTO_VALIDATION) {
            props.setColor(true)
            props.setBlur(true)
        } else if (questionState === questionStates.PHOTO_INVALID) {
            props.setColor(true)
            props.setBlur(true)
        }
    }, [questionState])

    function reSnap () {
        setTempRawImage()
        setQuestionState(questionStates.CAMERA)
    }

    useEffect(() => {
        // TODO manage photo data
        if (tempRawImage) {
            props.answerCallBack(tempRawImage)
            props.setInvalidImageFunc(() => setQuestionState(questionStates.PHOTO_INVALID))
            setQuestionState(questionStates.PHOTO_VALIDATION)
        }
    }, [tempRawImage])

    function getImageValidation () {
        return <Box className={[classes.containerLoading, 'background'].join(' ')} style={{ height: height }} >
            <CircularProgress style={{ color: theme.palette ? theme.palette.primary.contrastText : ThemeFactory.getDefaultTheme().palette.primary.contrastText }} />
            <Typography className={classes.imageValidationText} variant='subtitle1'>
        Votre photo est en cours de validation
            </Typography>
        </Box>
    }

    function getInvalidImage () {
        return <Box className={[classes.containerInvalidImage, 'background'].join(' ')}>
            <ColorCard className={classes.colorCard}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.invalidImageText} variant="h3">
                    Votre photo n est pas valide. Voulez vous recommencer ?
                    </Typography>
                    <Button key={'cancel'} color="secondary" variant="contained" className={'button'} onClick={reSnap} >
                    Reprendre
                    </Button>
                    <ColorBorderButton key={'resnap'} variant="outlined" className={'buttonAlt'} onClick={props.gotoDashBoard} >
                    Annuler
                    </ColorBorderButton>
                </CardContent>
            </ColorCard>
        </Box>
    }

    function getCamera () {
        return <React.Fragment>
            <Box>
                <Box className='timerZone'>
                    <Box className={classes.counter}>
                        <QuestionTimer timeLeft={timeLeft} progress={progress} />
                    </Box>
                </Box>
                <Box className='topZone'>
                    <Box className={[classes.header, 'color-White'].join(' ')}>
                        <Typography variant='subtitle1' className={classes.HeaderTitle} align={'left'}>
                            {title}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box className={['bottomZoneQuestions', classes.bottomImageQuestion].join(' ')}>
                {/* TODO add camera control */}
                <ImageCapture setImageURL={setTempRawImage} videoController={videoController} />
            </Box>
            <Box className='backgroundGradientTop' />
        </React.Fragment>
    }

    function getChallengeContent (state) {
        switch (state) {
        case questionStates.CAMERA:
            return getCamera()
        case questionStates.PHOTO_VALIDATION:
            return getImageValidation() // getImageValidation() // <ImageValidation  />
        case questionStates.PHOTO_INVALID:
            return getInvalidImage()
        }
    }

    // eslint-disable-next-line no-unused-vars

    return (
        <Box className='content' >
            {getChallengeContent(questionState)}
        </Box>
    )
}

export default QuestionImage

/*

 */
