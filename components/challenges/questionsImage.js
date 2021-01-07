import React /* , { useEffect, useRef, useState } */, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import InvalidImage from '../ui/image/InvalidImage'
import Camera from '../ui/image/Camera'
import ImageValidation from '../ui/image/ImageValidation'

const questionStates = Object.freeze({
    CAMERA: 'camera',
    PHOTO_VALIDATION: 'photoValidation',
    PHOTO_INVALID: 'photoInvalid'
})

function QuestionImage (props) {
    const { title, duration } = props.content
    const [progress, setProgress] = useState(0)
    const [timeLeft, setTimeLeft] = useState(duration)
    const [questionState, setQuestionState] = useState(questionStates.CAMERA)
    // eslint-disable-next-line no-unused-vars
    const [tempRawImage, setTempRawImage] = useState(null)

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
        return <ImageValidation/>
    }

    function getInvalidImage () {
        return <InvalidImage reSnap={reSnap} gotoDashBoard={props.gotoDashBoard} />
    }

    function getCamera () {
        return <Camera timeLeft={timeLeft} progress={progress} setTempRawImage={setTempRawImage} title={title} />
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
