import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme = useTheme) => ({
    avatarContainer: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    avatar: {
        width: '6rem',
        height: '6rem',
        marginBottom: '0.5rem',
        zIndex: 1
    },
    avatarBg: {
        position: 'absolute',
        width: '6rem',
        height: '6rem',
        backgroundColor: theme.palette.primary.light,
        borderRadius: '50%',
        display: 'inline-block',
        zIndex: 0
    }
}))

// TODO - rename component
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
