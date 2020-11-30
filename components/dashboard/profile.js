import React, { useState, useEffect, useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { useStyles } from '../../styles/jsx/components/profile/profile.style'
import Grow from '@material-ui/core/Grow'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { CustomDisabledButton } from '../../components/ui/button/CustomDisabledButton'
import Avatar from '@material-ui/core/Avatar'
import InputBase from '@material-ui/core/InputBase'
import UserContext from '../../hooks/userContext'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

function Profile (props, ref) {
    const { dataProvider, store } = useContext(UserContext)
    const { eventName } = store
    const [user, setUser] = useState({})
    const [avatars, setAvatars] = useState([])
    const [userName, setUserName] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [dataFetched, setDataFetched] = useState({})
    const classes = useStyles()
    // const { open, handleClose } = props
    const { open } = props
    const [selected, setSelected] = useState(undefined)

    async function editUser (eventName, avatarURL, userName) {
        try {
            const bodyContent = { eventName: eventName, avatarURL: avatarURL, nickname: userName }
            const response = await fetch('/api/editUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyContent)
            })
            if (response.status === 200) {
                const content = await response.json()
                setDataFetched(content)
            } else {
                console.log('response not 200', response)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    function getAvatars () {
        if (!dataProvider.getAvatars().includes(user.avatarURL)) {
            return [user.avatarURL, ...dataProvider.getAvatars()]
        }
        return dataProvider.getAvatars()
    }

    function updateProfile () {
        editUser(eventName, avatars[selected], userName).then()
    }

    /* function editNickname (events, nickname) {
        editUser(events, undefined, nickname)
    } */

    function onListItemClick (index) {
        setSelected(index)
    }

    const onInputChange = e => {
        setUserName(e.target.value)
    }

    useEffect(() => {
        if (Object.keys(dataFetched).length !== 0) {
            console.log('dataFetched', dataFetched)
            // dataProvider.setUser(dataFetched)
            // console.log('dataProvider', dataProvider)
        }
    }, [dataFetched])

    useEffect(() => {
        setUser(dataProvider.getUser())
    }, [])

    useEffect(() => {
        setAvatars(getAvatars())
    }, [user])

    useEffect(() => {
        if (avatars.length > 0 && user.avatarURL !== undefined) {
            setUserName(user.nickname)
            setSelected(avatars.indexOf(user.avatarURL))
            setLoading(false)
        }
    }, [avatars, user])

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
                    dangerouslySetInnerHTML={{ __html: 'Choisissez votre nouvel avatar et votre Nom' }}/>
                {!isLoading
                    ? <GridList cellHeight={'auto'} className={classes.gridList} cols={3}>
                        {avatars.map((tile, index) => (
                            <GridListTile
                                key={index}
                                onClick={() => onListItemClick(index)}
                                className={[selected === index ? classes.selected : null].join(' ')}>
                                <Avatar src={tile}/>
                            </GridListTile>
                        ))}
                    </GridList>
                    : <Box className={classes.loadingContainer}>
                        <CircularProgress className={classes.circularProgress}/>
                    </Box>}
                <InputBase
                    className={classes.textField}
                    type="text"
                    onChange={onInputChange}
                    value={userName}
                />
                <CustomDisabledButton
                    color="secondary"
                    variant="contained"
                    className={'buttonModal'}
                    onClick={updateProfile}
                    disabled={selected === undefined}>
                    Valides tes choix
                </CustomDisabledButton>
            </Box>
        </Grow>
    )
}

export default React.forwardRef(Profile)
