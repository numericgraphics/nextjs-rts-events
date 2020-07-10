import React from 'react'
import Box from '@material-ui/core/Box'
import { styles, useStyles } from '../../styles/promos'
import { useHeight } from '../../hooks/useHeight'

export default function PromoImage (props) {
    const classes = useStyles()
    const height = useHeight()
    const { backgroundImageURL } = props.data

    return (
        <Box className={classes.containerGlobal}>
            <Box style={{ ...styles.containerOverlay, backgroundImage: `url(${backgroundImageURL})`, minHeight: height }} />
        </Box>
    )
}
