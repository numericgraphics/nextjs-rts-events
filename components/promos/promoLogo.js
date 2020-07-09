import React, { createRef, useContext } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import { styles, useStyles } from '../../styles/promos'
import InnerHeightLayout from '../innerHeightLayout'
import UserContext from '../UserContext'

export default function PromoLogo (props) {
    const classes = useStyles()
    const { description, title, backgroundImageURL, logoURL } = props.data
    const { dataProvider } = useContext(UserContext)
    const layoutRef = createRef()

    return (
        <InnerHeightLayout class={classes.containerGlobal} ref={layoutRef} >
            <Box style={styles.containerOverlay} >
                <Box className={classes.image}>
                    <CardMedia
                        component="img"
                        alt={description}
                        image={logoURL}
                        title={title}
                    />
                </Box>
                <Box className={classes.text}>
                    <Typography className={classes.subTitle} variant="h3" align={'center'}>{title}</Typography>
                    <Typography className={classes.description} variant="subtitle1" align={'center'}>{description}</Typography>
                </Box>
            </Box>
            <Box style={{ ...styles.containerImage, backgroundImage: `url(${backgroundImageURL})`, minHeight: dataProvider.innerHeight }} />
        </InnerHeightLayout>

    )
}
