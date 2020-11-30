import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/components/profile/profile.style'
import Grow from '@material-ui/core/Grow'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { CustomDisabledButton } from '../../components/ui/button/CustomDisabledButton'
import Avatar from '@material-ui/core/Avatar'
import Router from 'next/router'

function Profile (props, ref, avatarRef) {
    async function changeAvatar (events, url) {
        try {
            // const params = (new URL(document.location)).searchParams
            // const date = params.get('date') ? params.get('date') : null
            // const time = params.get('time') ? params.get('time') : null
            const bodyContent = { eventName: events, avatarURL: url }
            const response = await fetch('/api/changeAvatar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyContent)
            })
            if (response.status === 200) {
                const content = await response.json()
                console.log(content)
                await Router.reload()
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const classes = useStyles()
    const { open, avatars, handleClose, currentAvatar } = props
    const [selected, setSelected] = useState(undefined)

    function onListItemClick (index) {
        setSelected(index)
    }

    function onValidate () {
        changeAvatar('popquiz', avatars[selected]).then()
        handleClose()
    }

    useEffect(() => {
        setSelected(avatars.indexOf(currentAvatar))
    }, [])

    return (
        <Grow
            in={open}
            timeout={1000} >
            <Box ref={ref}
                className={classes.modalContent}
                tabIndex={'-1'} >
                <Typography
                    variant="h3"
                    className={'modal-title'}
                    align={'center'}
                    dangerouslySetInnerHTML={{ __html: 'Choisissez votre nouvel avatar' }}/>
                <GridList cellHeight={'auto'} className={classes.gridList} cols={3}>
                    {avatars.map((tile, index) => (
                        <GridListTile
                            key={index}
                            onClick={() => onListItemClick(index)}
                            className={[selected === index ? classes.selected : null].join(' ')}>
                            <Avatar src={tile}/>
                        </GridListTile>
                    ))}
                </GridList>
                <CustomDisabledButton
                    color="secondary"
                    variant="contained"
                    className={'button'}
                    onClick={onValidate}
                    disabled={selected === undefined}>
                    Valides ton choix
                </CustomDisabledButton>
            </Box>
        </Grow>
    )
}

export default React.forwardRef(Profile)
