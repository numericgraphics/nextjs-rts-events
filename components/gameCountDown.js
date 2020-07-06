import React, { useState, useEffect, forwardRef } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    backGround: {
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray'
    },
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

const GameCountDown = (props, ref) => {
    const [progress, setProgress] = useState(0)
    const classes = useStyles()

    function startTimer () {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? stopTimer() : prevProgress + 3))
        }, 100)
        function stopTimer () {
            setProgress(100)
            clearInterval(timer)
            props.finishedCallBack()
        }
    }

    useEffect(() => {
        startTimer()
    }, [props.timer])

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
        <Box className={classes.backGround} >
            <Box position="relative" display="inline-flex">
                <CircularProgress className={classes.bottomCircle} variant="static" size={300} thickness={0.5} value={100} />
                <CircularProgress className={classes.topCircle} variant="static" size={300} thickness={0.5} value={progress} />
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
        </Box>
    )
}

export default forwardRef(GameCountDown)
