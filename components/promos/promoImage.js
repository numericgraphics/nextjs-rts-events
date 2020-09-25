import React from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/promo.style'
import { useHeight } from '../../hooks/useHeight'

export default function PromoImage (props) {
    const styles = useStyles()
    const height = useHeight()
    const { backgroundImageURL } = props.data

    return (
        <Box className={styles.contentSwipeableView}>
            <Box className={styles.backgroundSwipeableView}
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 65%, rgba(0,0,0,1) 100%), url(${backgroundImageURL})`,
                    height: height
                }} />
        </Box>
    )
}
