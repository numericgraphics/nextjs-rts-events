import Box from '@material-ui/core/Box'
import React, { useRef } from 'react'
import { useStyles } from '../../../styles/jsx/components/background/KenBurnsImage.style'

function KenBurnsImage (props) {
    const ref = useRef()
    const classes = useStyles()

    return (
        <Box ref={ref}
            className={[props.className, classes.containerImage].join(' ')}
            key={props.key}
        >
            <Box style={{ backgroundImage: props.imageURL ? `url(${props.imageURL})` : 'none', ...props.style }}
                className={props.animated ? [classes.image, classes.animation].join(' ') : classes.image} />
            {props.children}
        </Box>
    )
}

export default KenBurnsImage
