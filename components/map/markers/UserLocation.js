import React from 'react'
import Box from '@material-ui/core/Box'
import { useStyles } from '../../../styles/jsx/components/map/markers/userLocation.style'

function UserLocation (props) {
    const classes = useStyles()

    return (
        <Box className={[classes.markerBox, classes.pulse].join(' ')}/>
    )
}
export default UserLocation
