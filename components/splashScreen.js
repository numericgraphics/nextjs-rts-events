import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { useTweenMaxWithRef } from '../hooks/useTweenMax'

const useStyles = makeStyles({
    containerProgress: {
        display: 'flex',
        zIndex: 10,
        width: '100%',
        minHeight: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#006978'
    },
    textRegularCenter: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '2rem'
    }
})

function SplashScreen (props) {
    const [height, setHeight] = useState()
    const animRef = useRef()

    function animCallback () {
        if (props.animationState) {
            props.endedCallBack()
        } else {
            props.startedCallBack()
        }
    }

    const [startAnimHandler] = useTweenMaxWithRef(animRef, 2, {
        y: -250,
        opacity: 1,
        delay: 0.5,
        transformOrigin: 'center',
        onComplete: animCallback
    })

    const [endAnimHandler] = useTweenMaxWithRef(animRef, 0.5, {
        opacity: 0,
        scale: 1.4,
        transformOrigin: 'center',
        onComplete: animCallback
    })

    useEffect(() => {
        setHeight(window.innerHeight)
    }, [])

    useEffect(() => {
        if (props.animationState) {
            endAnimHandler()
        } else {
            startAnimHandler()
        }
    }, [props.animationState, startAnimHandler, endAnimHandler])

    const classes = useStyles()
    return (
        <Box className={classes.containerProgress} style={{ minHeight: height }}>
            <Box>
                <svg width="300" height="300" x="0px" y="0px" viewBox="0 0 841.89 595.28">
                    <g ref={animRef} opacity="0">
                        <g>
                            <path className="st0" d="M468.41,288.68l-2.35,15.11c-0.39,2.94,0.98,4.12,3.54,4.51c5.69,0.78,20.01,1.76,33.95,1.76
                            c31.2,0,53.96-10.2,53.96-39.24c0-17.07-7.46-29.82-33.36-36.5l-14.52-3.73c-9.81-2.55-14.33-5.69-14.33-12.95
                            c0-10.2,9.42-12.17,18.45-12.17c12.17,0,24.53,0.98,29.43,1.37c5.09,0.39,6.47-0.19,7.26-4.52l2.35-14.72
                            c0.4-2.94-0.97-4.12-3.53-4.51c-5.69-0.79-18.25-1.76-34.14-1.76c-32.38,0-48.07,14.12-48.07,36.49
                            c0,20.21,10.98,32.19,30.02,37.08l14.52,3.73c11.97,3.15,17.07,6.67,17.07,14.14c0,10.98-7.46,12.95-25.5,12.95
                            c-8.25,0-22.57-1.17-27.48-1.56C470.57,283.78,469.2,284.36,468.41,288.68z M390.39,303.59c0,3.93,1.18,5.3,5.11,5.3h18.05
                            c3.93,0,5.1-1.36,5.1-5.3v-96.92H452c3.93,0,5.11-1.38,5.11-5.3v-13.35c0-3.92-1.17-5.3-5.11-5.3h-94.96c-3.93,0-5.1,1.37-5.1,5.3
                            v13.35c0,3.92,1.17,5.3,5.1,5.3h33.35V303.59z M294.98,243.75l-1.96,8.24c-0.59,2.35-0.78,3.54-0.78,4.32
                            c0,1.96,0.59,3.53,1.96,5.88l23.35,42c1.96,3.34,3.54,4.7,8.25,4.7h21.38c2.75,0,6.08-1.76,2.95-6.67l-28.65-47.48
                            c9.62-6.08,20.41-14.72,20.41-33.75c0-24.52-13.74-38.26-43.96-38.26h-43.76c-3.92,0-5.09,1.37-5.09,5.3V303.6
                            c0,3.93,1.17,5.3,5.09,5.3h18.06c3.93,0,5.11-1.36,5.11-5.3v-97.52h18.64c11.77,0,17.46,4.32,17.46,15.31
                            c0,10-4.51,13.14-9.03,15.1C298.71,238.84,296.75,236.29,294.98,243.75z"/>
                        </g>
                        <g>
                            <path className="st0"
                                d="M286.95,332.86h-25.67v15.39h24.93v9.08h-24.93v21.4h25.67v9.08h-35.34v-64.04h35.34V332.86z"/>
                            <path className="st0"
                                d="M302.88,323.78l17.71,44.38l17.96-44.38h10.58l-28.74,68.85l-28.08-68.85H302.88z"/>
                            <path className="st0"
                                d="M392.42,332.86h-25.67v15.39h24.93v9.08h-24.93v21.4h25.67v9.08h-35.34v-64.04h35.34V332.86z"/>
                            <path className="st0"
                                d="M405.11,387.82v-68.39l46.7,48.86v-44.5h9.66v67.94l-46.7-48.73v44.83H405.11z"/>
                            <path className="st0" d="M494.49,332.86v54.95h-9.66v-54.95H470.1v-9.08h39.07v9.08H494.49z"/>
                            <path className="st0" d="M553.92,333.32l-7.84,4.64c-1.47-2.54-2.86-4.2-4.19-4.98c-1.38-0.88-3.17-1.33-5.35-1.33
                            c-2.68,0-4.91,0.76-6.68,2.28c-1.77,1.49-2.65,3.37-2.65,5.64c0,3.12,2.32,5.64,6.97,7.55l6.39,2.61c5.2,2.1,9,4.67,11.41,7.69
                            s3.61,6.74,3.61,11.14c0,5.89-1.96,10.76-5.89,14.6c-3.95,3.87-8.86,5.81-14.72,5.81c-5.56,0-10.15-1.64-13.77-4.94
                            c-3.57-3.29-5.79-7.92-6.68-13.89l9.79-2.16c0.44,3.76,1.22,6.36,2.32,7.8c1.99,2.76,4.89,4.15,8.71,4.15
                            c3.01,0,5.52-1.01,7.51-3.03c1.99-2.02,2.99-4.58,2.99-7.67c0-1.24-0.17-2.38-0.52-3.42c-0.35-1.04-0.89-1.99-1.62-2.86
                            s-1.68-1.69-2.84-2.45s-2.54-1.49-4.15-2.18l-6.18-2.57c-8.77-3.71-13.15-9.12-13.15-16.26c0-4.81,1.84-8.83,5.52-12.07
                            c3.68-3.26,8.25-4.89,13.73-4.89C544.01,322.54,549.78,326.13,553.92,333.32z"/>
                        </g>
                    </g>
                </svg>
            </Box>
        </Box>
    )
}

export default SplashScreen