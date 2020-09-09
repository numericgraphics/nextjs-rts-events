import React, { createRef } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { styles, useStyles } from '../../styles/promos'
import InnerHeightLayout from '../innerHeightLayout'
import { useHeight } from '../../hooks/useHeight'

export default function PromoNoLogo (props) {
    const classes = useStyles()
    const { description, title, backgroundImageURL } = props.data
    const layoutRef = createRef()
    const height = useHeight()

    return (
        <Box >
            <Box className={classes.containerOverlayNoLogo} >
                <Box className={classes.text}>
                    <Typography className={classes.title} variant="h1" align={'center'}>{title}</Typography>
                    <Typography className={classes.subTitle} variant="h3" align={'center'}>{description}</Typography>
                </Box>
            </Box>
            <Box className={classes.gradient}/>
            <Box className={'background'} style={{ backgroundImage: `url(${backgroundImageURL})` }} />
        </Box>

    )
}
