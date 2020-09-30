import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import { useStyles } from '../../styles/promo.style'
import { useHeight } from '../../hooks/useHeight'
import Fade from '@material-ui/core/Fade'

export default function LayoutPromo (props) {
    const styles = useStyles()
    const height = useHeight()
    const { description, title, logoURL } = props.data

    return (
        <Box className={styles.contentSwipeableView}>
            <Fade in={!props.isMoving && props.selected} timeout={300}>
                <Box className={styles.subContent} style={{ height: height }}>
                    <Box className={styles.subBottomZone}>
                        {logoURL && <Box className={styles.image}>
                            <CardMedia
                                component="img"
                                alt={description}
                                image={logoURL}
                                title={title}
                            />
                        </Box>}
                        <Box className={styles.text}>
                            <Typography className={styles.title} align={'center'}>{title}</Typography>
                            <Typography className={styles.subTitle} align={'center'}>{description}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Fade>
            <Box className={styles.backgroundSwipeableView} />
        </Box>
    )
}
