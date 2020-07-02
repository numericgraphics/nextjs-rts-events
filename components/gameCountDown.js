import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import InnerHeightLayout from './innerHeightLayout'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    containerProgress: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray'
    },
    textProgress: {
        color: 'white',
        fontFamily: 'srgssr-type-Bd',
        fontSize: '6rem'
    },
    bottomCircle: {
        color: 'white'
    },
    topCircle: {
        position: 'absolute',
        left: 0
    }
})

function GameCountDown (props) {
    const [progress, setProgress] = useState(0)
    const classes = useStyles()

    function startTimer () {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? stopTimer() : prevProgress + 3))
        }, 100)
        function stopTimer () {
            setProgress(100)
            props.finishedCallBack()
            clearInterval(timer)
        }
    }

    useEffect(() => {
        startTimer()
    }, [])

    function displayCountDownText () {
        if (Math.round(progress) > 0 && Math.round(progress) < 30) {
            return '1'
        } else if (Math.round(progress) > 30 && Math.round(progress) < 60) {
            return '2'
        } else if (Math.round(progress) > 60 && Math.round(progress) < 90) {
            return '3'
            // eslint-disable-next-line no-mixed-operators
        } else if (Math.round(progress) > 90 || progress === undefined) {
            return 'GO'
        }
    }

    return (
        <InnerHeightLayout class={classes.containerProgress} >
            <Box position="relative" display="inline-flex">
                <CircularProgress className={classes.bottomCircle} variant="static" size={300} thickness={1} value={100} />
                <CircularProgress className={classes.topCircle} variant="static" size={300} thickness={1} value={progress} />
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography className={classes.textProgress}>{displayCountDownText()}</Typography>
                </Box>
            </Box>
        </InnerHeightLayout>
    )
}

export default GameCountDown
