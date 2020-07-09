import React, { useContext, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { styles, useStyles } from '../../styles/promos'
import UserContext from '../UserContext'

export default function PromoImage (props) {
    const classes = useStyles()
    const { dataProvider } = useContext(UserContext)
    const { backgroundImageURL } = props.data
    useEffect(() => {

    }, [props.selected])

    return (
        <Box className={classes.containerGlobal}>
            <Box style={{ ...styles.containerOverlay, backgroundImage: `url(${backgroundImageURL})`, minHeight: dataProvider.innerHeight }} />
        </Box>
    )
}
