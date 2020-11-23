import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/components/profile/profile.style'
import Grow from '@material-ui/core/Grow'

function Profile (props, ref) {
    const classes = useStyles()
    return (
        <Grow
            in={props.open}
            timeout={1000} >
            <Box ref={ref}
                className={classes.modalContent}
                tabIndex={'-1'} >
                <Typography variant="h3" className={'modal-title'} align={'center'} dangerouslySetInnerHTML={{ __html: 'Votre Profil' }}/>

            </Box>
        </Grow>
    )
}

export default React.forwardRef(Profile)
