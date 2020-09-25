import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import { useStyles } from '../../styles/promo.style'
import { useHeight } from '../../hooks/useHeight'

export default function PromoLogo (props) {
    const styles = useStyles()
    const height = useHeight()
    const { description, title, backgroundImageURL, logoURL } = props.data

    return (
        <Box className={styles.contentSwipeableView}>
            <Box className={styles.subContent} style={{ height: height }}>
                <Box className={styles.subBottomZone}>
                    <Box className={styles.image}>
                        <CardMedia
                            component="img"
                            alt={description}
                            image={logoURL}
                            title={title}
                        />
                    </Box>
                    <Box className={styles.text}>
                        <Typography className={styles.title} align={'center'}>{title}</Typography>
                        <Typography className={styles.subTitle} align={'center'}>{description}</Typography>
                    </Box>
                </Box>
            </Box>
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
