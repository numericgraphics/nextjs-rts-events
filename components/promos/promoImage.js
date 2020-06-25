import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { styles, useStyles } from '../../styles/promos'

export default function PromoImage (props) {
    const classes = useStyles()
    const { backgroundImageURL } = props.data
    useEffect(() => {

    }, [props.selected])

    return (
        <Box className={classes.containerGlobal}>
            <Box style={{ ...styles.containerOverlay, backgroundImage: `url(${backgroundImageURL})` }} />
        </Box>
    )
}
