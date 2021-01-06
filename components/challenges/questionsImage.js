import React /* , { useEffect, useRef, useState } */, { useContext, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/jsx/pages/questions.style'
import QuestionTimer from '../ui/progress/questionTimer'
import UserContext from '../../hooks/userContext'
import Typography from '@material-ui/core/Typography'
import { ChallengeStates } from '../../data/challengeState'
import ImageCapture from '../ui/image/ImageCapture'
import ThemeFactory from '../../data/themeFactory'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

const questionStates = Object.freeze({
    CAMERA: 'camera',
    PHOTO_VALIDATION: 'photoValidation'
})

function QuestionImage (props) {
    const classes = useStyles()
    const { title, duration } = props.content
    const [progress, setProgress] = useState(0)
    const [timeLeft, setTimeLeft] = useState(duration)
    const [questionState, setQuestionState] = useState(ChallengeStates.LOADING)
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
        console.log('useEffect - QuestionImage content ', props.content)
        setQuestionState(questionStates.CAMERA)
    }, [])

    useEffect(() => {
        if (questionState === questionStates.CAMERA) {
            // set blur False
            props.setBlur(false)
        } else if (questionState === questionStates.PHOTO_VALIDATION) {
            props.setColor(true)
            props.setBlur(true)
        }
    }, [questionState])

    function imageToBase64 (url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.onload = function () {
            var reader = new FileReader()
            reader.onloadend = function () {
                callback(reader.result)
            }
            reader.readAsDataURL(xhr.response)
        }
        xhr.open('GET', url)
        xhr.responseType = 'blob'
        xhr.send()
    }

    useEffect(() => {
        // TODO manage photo data
        if (tempRawImage) {
            imageToBase64(tempRawImage, function (dataUrl) {
                // Convert image to base64
                console.log('RESULT:', dataUrl)
                props.answerCallBack(dataUrl)
            })
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

    function getChallengeContent (state) {
        switch (state) {
        case questionStates.CAMERA:
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
            // <ImageCapture setData={setTempRawImage} onClick={takeSnapShot}/>
        case questionStates.PHOTO_VALIDATION:
            return getImageValidation() // <ImageValidation  />
        }
    }

    // eslint-disable-next-line no-unused-vars
    function takeSnapShot () {
        setQuestionState(questionStates.PHOTO_VALIDATION)
    }

    return (
        <Box className='content' >
            {getChallengeContent(questionState)}
        </Box>
    )
}

export default QuestionImage

/*

 */
