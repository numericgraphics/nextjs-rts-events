import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import { useStyles } from './promo.style.js'

export default function PromoLogo (props) {
    const styles = useStyles()
    const { description, title, backgroundImageURL, logoURL } = props.data

    return (
        <React.Fragment>
            <Box className={styles.subContent} >
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
                        <Typography className={styles.title} variant="h1" align={'center'}>{title}</Typography>
                        <Typography className={styles.subTitle} variant="h3" align={'center'}>{description}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box className={'backgroundGiftGradient'}/>
            <Box className={'background'} style={{ background: `url(${backgroundImageURL}) no-repeat center center`, backgroundSize: 'auto 100%' }} />
        </React.Fragment>
    )
}
