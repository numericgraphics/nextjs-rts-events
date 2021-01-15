import React from 'react'
import { Box } from '@material-ui/core'

const ImageRecoLoader = ({ color, interval, nDots }) => {
    const baseStyles = {
        height: '20px',
        width: '20px',
        display: 'inline-block',
        margin: '0 5px',
        backgroundColor: color,
        borderRadius: '50%',
        opacity: 0.4,
        animation: `fadeInOut ${interval * nDots}ms linear infinite`
    }

    const dots = []
    for (let i = 0; i < nDots; i++) {
        const dotStyles = Object.assign({}, baseStyles, {
            animationDelay: `${interval * i}ms`
        })
        dots.push(<div key={i} style={dotStyles} />)
    }

    return <Box>{dots}</Box>
}

export default ImageRecoLoader
