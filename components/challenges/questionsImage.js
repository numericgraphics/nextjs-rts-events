import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/jsx/components/image/Camera.style'
import Typography from '@material-ui/core/Typography'
import ImageCapture from '../ui/image/ImageCapture'
import Fade from '@material-ui/core/Fade/Fade'

function QuestionImage (props) {
    const classes = useStyles()
    const { answerCallBack, content } = props
    const { title, reco } = content
    const { instructions } = reco
    const [tempRawImage, setTempRawImage] = useState(null)
    const [showComponent, setShowComponent] = useState(false)

    useEffect(() => {
        setShowComponent(true)
    }, [])

    useEffect(() => {
        if (tempRawImage) {
            answerCallBack(tempRawImage)
        }
    }, [tempRawImage])

    return (
        <Fade
            in={showComponent}
            timeout={1000}
        >
            <Box className='content' >
                <Box className='topZone'>
                    <Box className={[classes.header, 'color-White'].join(' ')}>
                        <Typography
                            variant='subtitle1'
                            className={classes.HeaderTitle}
                            align={'left'}
                        >
                            {title}
                        </Typography>
                    </Box>
                </Box>
                <Box className={['bottomZoneQuestions', classes.bottomImageQuestion].join(' ')}>
                    <ImageCapture
                        result={setTempRawImage}
                        text={instructions}
                    />
                </Box>
            </Box>
        </Fade>
    )
}

export default QuestionImage
