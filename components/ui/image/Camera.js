
import React from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/image/Camera.style'
import Typography from '@material-ui/core/Typography'
import ImageCapture from './ImageCapture'
import QuestionTimer from '../progress/questionTimer'

function Camera (props) {
    const classes = useStyles()

    return (
        <React.Fragment>
            <Box>
                <Box className='timerZone'>
                    <Box className={classes.counter}>
                        <QuestionTimer timeLeft={props.timeLeft} progress={props.progress} />
                    </Box>
                </Box>
                <Box className='topZone'>
                    <Box className={[classes.header, 'color-White'].join(' ')}>
                        <Typography variant='subtitle1' className={classes.HeaderTitle} align={'left'}>
                            {props.title}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box className={['bottomZoneQuestions', classes.bottomImageQuestion].join(' ')}>
                {/* TODO add camera control */}
                <ImageCapture setImageURL={props.setTempRawImage} />
            </Box>
            <Box className='backgroundGradientTop' />
        </React.Fragment>
    )
}
export default Camera
