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
    const [nickname, setNickname] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [dataFetched, setDataFetched] = useState({})
    const classes = useStyles()
    const { open, handleClose } = props
    const [selected, setSelected] = useState(undefined)

    async function editUser (eventName, avatarURL, nickname) {
        try {
            const bodyContent = { eventName, avatarURL, nickname }
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
        editUser(eventName, avatars[selected], nickname).then()
    }

    function onListItemClick (index) {
        setSelected(index)
    }

    const onInputChange = e => {
        setNickname(e.target.value)
    }

    useEffect(() => {
        if (Object.keys(dataFetched).length !== 0) {
            dataProvider.setUser(dataFetched)
            handleClose()
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
            setNickname(user.nickname)
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
                    value={nickname}
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
