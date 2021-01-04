import React /* , { useEffect, useRef, useState } */, { useContext, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/jsx/pages/questions.style'
import QuestionTimer from '../ui/progress/questionTimer'
import UserContext from '../../hooks/userContext'
import Typography from '@material-ui/core/Typography'
import { ChallengeStates } from '../../data/challengeState'
import ImageCapture from '../ui/image/ImageCapture'
import { ColorBorderButton } from '../../components/ui/button/ColorBorderButton'

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

    useEffect(() => {
        if (progress >= 100) {
            setTimeLeft(0)
            setProgress(0)
        }
    }, [progress])

    function reSnap () {
        setTempRawImage()
        setQuestionState(questionStates.CAMERA)
    }

    useEffect(() => {
        console.log('useEffect - QuestionImage content ', props.content)
        setQuestionState(questionStates.CAMERA)
    }, [])

    useEffect(() => {
        if (questionState === questionStates.CAMERA) {
            // set blur False
            videoController.setBlurVideo(false)
            videoController.setVideoVisible(true)
            videoController.setShowVideo(true)
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
        return <React.Fragment>
            <Typography variant='subtitle1'>
        Votre photo en cours de validation
            </Typography>
            <ColorBorderButton
                color="secondary"
                variant="contained"
                className={['button', classes.buttonValidImage].join(' ')}
                onClick={reSnap}
            >
                Reprendre
            </ColorBorderButton>
        </React.Fragment>
    }

    function getChallengeContent (state) {
        switch (state) {
        case questionStates.CAMERA:
            return <ImageCapture setImageURL={setTempRawImage} videoController={videoController} /> // <ImageCapture setData={setTempRawImage} onClick={takeSnapShot}/>
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
                        <Typography variant='h3' className={classes.HeaderText} align={'left'}>
                            question ????
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box className={['bottomZoneQuestions', classes.bottomImageQuestion].join(' ')}>
                {/* TODO add camera control */}
                {getChallengeContent(questionState)}
            </Box>
            <Box className='backgroundGradientTop' />
        </Box>
    )
}

export default QuestionImage

/*

 */
