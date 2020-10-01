import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useStyles } from '../../styles/promo.style'
import { useHeight } from '../../hooks/useHeight'
import Fade from '@material-ui/core/Fade/Fade'

export default function PromoNoLogo (props) {
    const styles = useStyles()
    const height = useHeight()
    const { description, title } = props.data

    return (
        <Box className={styles.contentSwipeableView}>
            <Fade in={!props.isMoving && props.selected} timeout={300}>
                <Box className={styles.subContent} style={{ height: height }}>
                    <Box className={styles.subBottomZone}>
                        <Box className={styles.text}>
                            <Typography className={styles.title} variant="h1" align={'center'}>{title}</Typography>
                            <Typography className={styles.subTitle} variant="h3" align={'center'}>{description}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Fade>
            <Box className={styles.backgroundSwipeableView} />
        </Box>
    )
}
