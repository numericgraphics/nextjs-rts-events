import React from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/jsx/gifts/giftsBox.style'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { giftIcon } from '../../data/icon'

function CommunityDashboardWidget (props) {
    const classes = useStyles()

    return (
        <Box className={classes.containerGifts}>
            <Typography
                variant='subtitle1'
                className={[classes.textRegularCenterOverlay].join(' ')}
                dangerouslySetInnerHTML={{ __html: props.textContent }}
            />
            <IconButton
                onClick={() => props.onClick() }
                color="primary"
                className={classes.gift}>
                { giftIcon({ className: classes.cadeau })}
            </IconButton>
        </Box>
    )
}

export default CommunityDashboardWidget
