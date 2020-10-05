import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { useTweenMaxWithRef } from '../hooks/useTweenMax'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

const useStyles = makeStyles({
    container: {
        position: 'fixed',
        display: 'flex',
        zIndex: 10,
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    progress: {
        position: 'absolute'
    }
})

function SplashScreen (props) {
    const [height, setHeight] = useState()
    const [isLoading, setLoading] = useState(false)
    const animRef = useRef()

    function animCallback () {
        props.startedCallBack()
        setLoading(true)
    }

    function animEndedCallback () {
        props.endedCallBack()
    }

    const [startAnimHandler] = useTweenMaxWithRef(animRef, 2, {
        y: -250,
        autoAlpha: 1,
        delay: 0.5,
        transformOrigin: 'center',
        onComplete: animCallback
    })

    const [endAnimHandler] = useTweenMaxWithRef(animRef, 0.5, {
        scale: 1.4,
        autoAlpha: 0,
        overwrite: 'all',
        onComplete: animEndedCallback
    })

    useEffect(() => {
        setHeight(window.innerHeight)
    }, [])

    useEffect(() => {
        if (props.animationState) {
            setLoading(false)
            endAnimHandler()
        } else {
            startAnimHandler()
        }
    }, [props.animationState])

    const classes = useStyles()
    return (
        <Box className={classes.container} style={{ height: height }}>
            <Box >
                <svg width="300" height="300" x="0px" y="0px" viewBox="0 0 841.89 595.28">
                    <g ref={animRef} opacity="0">
                        <g>
                            <rect x="217.9" y="173.1" fill="#af001e" width="406" height="249"/>
                            <path fill="#FFFFFF" d="M486.1,340.6l-2.4,15.1c-0.4,2.9,1,4.1,3.5,4.5c5.7,0.8,20,1.8,34,1.8c31.2,0,54-10.2,54-39.2
                            c0-17.1-7.5-29.8-33.4-36.5l-14.5-3.7c-9.8-2.5-14.3-5.7-14.3-13c0-10.2,9.4-12.2,18.5-12.2c12.2,0,24.5,1,29.4,1.4
                            c5.1,0.4,6.5-0.2,7.3-4.5l2.3-14.7c0.4-2.9-1-4.1-3.5-4.5c-5.7-0.8-18.2-1.8-34.1-1.8c-32.4,0-48.1,14.1-48.1,36.5
                            c0,20.2,11,32.2,30,37.1l14.5,3.7c12,3.1,17.1,6.7,17.1,14.1c0,11-7.5,13-25.5,13c-8.2,0-22.6-1.2-27.5-1.6
                            C488.2,335.7,486.9,336.3,486.1,340.6z M408,355.5c0,3.9,1.2,5.3,5.1,5.3h18c3.9,0,5.1-1.4,5.1-5.3v-96.9h33.4
                            c3.9,0,5.1-1.4,5.1-5.3V240c0-3.9-1.2-5.3-5.1-5.3h-95c-3.9,0-5.1,1.4-5.1,5.3v13.3c0,3.9,1.2,5.3,5.1,5.3H408V355.5z M312.6,295.7
                            l-2,8.2c-0.6,2.4-0.8,3.5-0.8,4.3c0,2,0.6,3.5,2,5.9l23.3,42c2,3.3,3.5,4.7,8.2,4.7h21.4c2.8,0,6.1-1.8,2.9-6.7l-28.6-47.5
                            c9.6-6.1,20.4-14.7,20.4-33.8c0-24.5-13.7-38.3-44-38.3h-43.8c-3.9,0-5.1,1.4-5.1,5.3v115.6c0,3.9,1.2,5.3,5.1,5.3h18.1
                            c3.9,0,5.1-1.4,5.1-5.3V258h18.6c11.8,0,17.5,4.3,17.5,15.3c0,10-4.5,13.1-9,15.1C316.4,290.8,314.4,288.2,312.6,295.7z"/>
                        </g>
                    </g>
                </svg>
            </Box>
            {isLoading && <CircularProgress className={classes.progress} style={{ color: '#af001e' }}/>}
        </Box>
    )
}

export default SplashScreen
