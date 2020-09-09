import React from 'react'
import Box from '@material-ui/core/Box'
import { styles, useStyles } from '../../styles/promos'
import { useHeight } from '../../hooks/useHeight'

export default function PromoImage (props) {
    const classes = useStyles()
    const height = useHeight()
    const { backgroundImageURL } = props.data

    return (
        <Box >
            <Box className={'background'} style={{ background: `url(${backgroundImageURL}) no-repeat center center fixed`, backgroundSize: 'cover' }} />
        </Box>
    )
}
