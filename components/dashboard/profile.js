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
import ButtonCloseModal from '../ui/modal/buttonCloseModal'
import useTheme from '@material-ui/core/styles/useTheme'
import { between } from '../../data/tools'

function Profile (props, ref) {
    const { dataProvider, store } = useContext(UserContext)
    const { eventName } = store
    const [user, setUser] = useState({})
    const [avatars, setAvatars] = useState([])
    const [nickname, setNickname] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [dataFetched, setDataFetched] = useState({})
    const [translation, setTranslation] = useState([])
    const [onTransition, setTransition] = useState(undefined)
    const [selected, setSelected] = useState(undefined)
    const [nicknameCheck, setNicknameCheck] = useState(true)
    const classes = useStyles()
    const { open, handleClose } = props
    const theme = useTheme()

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

    function onExited () {
        handleClose()
    }

    function transitionClose () {
        setTransition(false)
    }

    useEffect(() => {
        if (Object.keys(dataFetched).length !== 0) {
            dataProvider.setUser(dataFetched)
            setTransition(false)
        }
    }, [dataFetched])

    useEffect(() => {
        setUser(dataProvider.getUser())
        setTranslation(dataProvider.getTranslation())
        setTransition(open)
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

    useEffect(() => {
        setNicknameCheck(between(nickname.length, 3, 20))
    }, [nickname])

    return (
        <Grow
            in={onTransition}
            timeout={{
                appear: 1000,
                enter: 1000,
                exit: 200
            }}
            onExited={onExited}>
            <Box ref={ref}
                className={classes.modalContent}
                tabIndex={'-1'} >
                <ButtonCloseModal handleClose={transitionClose} className={classes.buttonClose}/>
                <Typography
                    variant="h3"
                    className={'modal-title'}
                    align={'center'}
                    dangerouslySetInnerHTML={{ __html: translation.profileSelectAvatarNickname }}/>
                <InputBase
                    className={classes.textField}
                    type="text"
                    onChange={onInputChange}
                    value={nickname}
                    style={{
                        boxShadow: nicknameCheck ? `0 0 0 0.2rem ${theme.palette.formValidate}`
                            : `0 0 0 0.2rem ${theme.palette.formNoValidate}`
                    }}
                />
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
                <CustomDisabledButton
                    color="secondary"
                    variant="contained"
                    className={['button', classes.buttonValidate].join(' ')}
                    onClick={updateProfile}
                    disabled={selected === undefined || !nicknameCheck}>
                    {translation.profileValidChoice}
                </CustomDisabledButton>
            </Box>
        </Grow>
    )
}

export default React.forwardRef(Profile)
