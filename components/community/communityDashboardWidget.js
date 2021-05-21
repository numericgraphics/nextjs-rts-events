import React from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/jsx/components/map/mapIcon.style'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { MapIcon } from '../../data/icon'

function CommunityDashboardWidget (props) {
    const classes = useStyles()

    return (
        <Box className={classes.containerIcon}>
            <Typography
                variant='subtitle1'
                dangerouslySetInnerHTML={{ __html: props.textContent }}
            />
            <IconButton
                onClick={() => props.onClick() }
                color="primary"
                className={classes.icon}>
                { MapIcon({ className: classes.mapsIcon })}
            </IconButton>
        </Box>
    )
}

export default CommunityDashboardWidget
