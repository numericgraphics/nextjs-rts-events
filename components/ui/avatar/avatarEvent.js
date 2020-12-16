import React from 'react'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import { useStyles } from '../../../styles/jsx/components/avatar/avatar.style'

function AvatarEvent (props) {
    const classes = useStyles()
    return (

        <Box className={classes.avatarContainer}>
            <Avatar className={classes.avatar} src={props.user}/>
            <Box className={classes.avatarBg}/>
        </Box>
    )
}
export default AvatarEvent
