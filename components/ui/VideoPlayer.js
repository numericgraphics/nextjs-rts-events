import { Player, ControlBar, BigPlayButton } from 'video-react'
import React, { forwardRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHeight } from '../../hooks/useHeight'

const useStyles = makeStyles({
    video: {
        position: 'absolute',
        top: 0,
        width: '100vw',
        height: '100vh!important',
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    playBtn: {
        display: 'none',
        opacity: 0
    }
})

function VideoPlayer (props, ref) {
    const classes = useStyles()
    const { videoSource, videoPoster, callBackState, callBackPlayed } = props
    const height = useHeight()

    useEffect(() => {
        console.log('height', height)
        ref.current.subscribeToStateChange((state) => {
            if (state.played.length > 0) {
                callBackPlayed(true)
            }
            callBackState(state)
        })
    }, [])

    return (
        <Player
            ref={ref}
            src={videoSource}
            fluid={true}
            width="100%"
            loop
            playsInline
            poster={videoPoster}
            controls={false}
            className={classes.video}
            autoPlay
            style={{ height: `${height}!important` }}>
            <BigPlayButton disabled={true} position="center" className={classes.playBtn}/>
            <ControlBar disableCompletely={true} />
        </Player>
    )
}

export default forwardRef(VideoPlayer)
