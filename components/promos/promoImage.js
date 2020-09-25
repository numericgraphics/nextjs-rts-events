import React from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../styles/promo.style'

export default function PromoImage (props) {
    const styles = useStyles()
    const { backgroundImageURL } = props.data

    return (
        <Box className={styles.contentSwipeableView}>
            <Box className={styles.backgroundSwipeableView}
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 65%, rgba(0,0,0,1) 100%), url(${backgroundImageURL})`,
                    height: '100vh'
                }} />
        </Box>
    )
}
