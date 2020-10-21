import React, { useContext, useEffect, useState, useRef } from 'react'
import Modal from '@material-ui/core/Modal'
import Checkbox from '@material-ui/core/Checkbox'
import Backdrop from '@material-ui/core/Backdrop'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Router from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import UserContext from '../components/UserContext'
import Button from '@material-ui/core/Button'
import SmsInput from '../components/ui/SmsInput'
import ReactPhoneInput from 'react-phone-input-2'
import { checkedBoxIcon, uncheckedBoxIcon } from '../data/icon'
import { phoneVerification } from '../data/tools'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '95%',
        minHeight: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        boxShadow: '0px 5px 10px 0px rgba(0,0,0,0.25)',
        padding: 30
    },
    containerTitle: {
        position: 'relative',
        paddingBottom: 30
    },
    title: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.25em',
        letterSpacing: '0em',
        lineHeight: 1.4
    },
    button: {
        position: 'relative',
        borderRadius: 30,
        alignSelf: 'center',
        fontSize: '1rem',
        padding: '6px 20px',
        marginTop: 30
    },
    root: {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        '& .a': {
            color: 'black'
        }
    },
    textFieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'

    },
    dropDown: {
        textAlign: 'left',
        maxWidth: '50vw',
        color: 'black'
    },
    dropDownDisabled: {
        textAlign: 'left',
        maxWidth: '50vw',
        color: 'grey',
        backgroundColor: 'grey'
    },
    CGUContent: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        textAlign: 'left'
    },
    CGUBox: {
        color: 'rgba(0,0,0, 0)!important',
        stroke: theme.palette.secondary.contrastText,
        padding: '12px 15px 12px 0px'
    },
    CGUBoxCheck: {
        color: 'rgba(0,0,0, 0)!important',
        stroke: theme.palette.secondary.contrastText
    },
    CGU: {
        width: '100%',
        marginTop: 30
    },
    CGUText: {
        fontSize: '0.9rem!important',
        letterSpacing: '0.00238em',
        lineHeight: 1.2
    },
    link: {
        color: theme.palette.secondary.contrastText,
        lineHeight: '1.1rem',
        textDecoration: 'underline'
    },
    container: {
        width: '80%',
        minWidth: 173
    },
    iconClass: {
        height: 'unset'
    },
    iconClassChecked: {
        height: 'unset',
        stroke: '#00FF14'
    },
    shakeMe: {
        WebkitAnimationName: 'shake',
        WebkitAnimationDuration: '0.82s',
        WebkitAnimationTimingFunction: 'cubic-bezier(.36,.07,.19,.97)',
        WebkitAnimationFillMode: 'both',
        transform: 'translate3d(0, 0, 0)',
        WebkitAnimationDelay: '1s'
    },
    phoneInputBorder: {
        boxShadow: '0 0 0 0.2rem rgba(0, 255, 20, 0.9)'
    }
}))

const ModalStates = Object.freeze({
    PHONE_NUMBER: 'phoneNumber',
    NUMBER_RECEIVE: 'numberReceive',
    LOADING: 'loading',
    ERROR: 'error'
})

const hasLoginModal = WrappedComponent => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const classes = useStyles()
        const [open, setOpen] = useState(false)
        const [loginState, setLoginState] = useState(ModalStates.PHONE_NUMBER)
        const [userData, setUserData] = useState({ phone: '', code: '' })
        const { dataProvider, store } = useContext(UserContext)
        const uiElement = dataProvider.getUiElements()
        const { agreementsChunks } = uiElement
        const { setLoading, eventName } = store
        const [translation, setTranslation] = useState([])
        const theme = useTheme()
        const [code, setCode] = useState()
        const smsSubmit = useRef()
        const [checked, setChecked] = useState(false)
        const [phoneVerif, setPhoneVerif] = useState(false)
        const [counter, setCounter] = useState(0)

        const handleOpen = () => {
            setOpen(true)
        }

        useEffect(() => {
            if (agreementsChunks === undefined || agreementsChunks.length === 0) {
                setChecked(false)
            }
            setTranslation(dataProvider.getTranslation())
        }, [])

        useEffect(() => {
            if (code) {
                setUserData(Object.assign({}, userData, { code: code }))
            }
        }, [code])

        useEffect(() => {
            if (agreementsChunks && agreementsChunks.length > 0) {
                setChecked(counter !== agreementsChunks.length)
            }
        }, [counter])

        const handleClose = () => {
            setLoginState(ModalStates.PHONE_NUMBER)
            setUserData({ phone: '', code: '', error: '' })
            setOpen(false)
            setChecked(false)
            setPhoneVerif(false)
            setCounter(0)
        }

        function checkBoxes (event) {
            setCounter(counter => event.target.checked ? counter + 1 : counter - 1)
        }

        function OpenModal () {
            handleOpen()
        }

        function onError (message) {
            setLoginState(ModalStates.ERROR)
            setUserData({ phone: '', code: '', error: message })
            setTimeout(() => {
                handleClose()
            }, 5000)
        }

        function KeyCheck (event) {
            var KeyID = event.keyCode
            if (KeyID === 13) {
                smsSubmit.current.focus()
            }
        }

        async function handleSubmitPhoneNumber (event) {
            event.preventDefault()
            setUserData({ ...userData, error: '' })
            setLoginState(ModalStates.LOADING)
            const phone = userData.phone

            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone, eventName })
                })

                if (response.status === 200) {
                    await Router.push('/[events]/dashBoard', `/${eventName}/dashBoard`)
                    return
                }

                if (response.status === 302) {
                    setLoginState(ModalStates.NUMBER_RECEIVE)
                    return
                }

                if (response.status !== 200) {
                    onError(translation.modalLoginPhoneErrorText)
                }
            } catch (error) {
                console.error(error)
                setLoginState(ModalStates.ERROR)
                setUserData({ ...userData, error: error.message })
            }
        }

        async function handleSubmitNumberReceive (event) {
            event.preventDefault()
            setUserData({ ...userData, error: '' })
            setLoginState(ModalStates.LOADING)
            const code = userData.code
            try {
                const response = await fetch('/api/number', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code, eventName })
                })

                if (response.status === 200) {
                    const content = await response.json()
                    const { nickname, avatarURL } = content
                    dataProvider.setData({ user: { nickname, avatarURL } })
                    setLoading(true)
                    await Router.push('/[events]/dashBoard', `/${eventName}/dashBoard`)
                    return
                }

                if (response.status !== 200) {
                    onError(translation.modalLoginNumberErrorText)
                }
            } catch (error) {
                console.error(error)
                setUserData({ ...userData, error: error.message })
            }
        }

        // TODO :  add error message centered and with right design
        function getLoginContent (state) {
            switch (state) {
            case ModalStates.NUMBER_RECEIVE:
                return <Box className={classes.modalContent}>
                    <Box className={classes.containerTitle}>
                        <Typography className={classes.title} variant="h4" align={'center'}>{translation.modalLoginNumberText}</Typography>
                    </Box>
                    <form className={classes.textFieldContainer} autoComplete="on" noValidate onSubmit={handleSubmitNumberReceive}>
                        <SmsInput onChange={ setCode } />
                        <Button color="primary" variant="contained" className={classes.button} type="submit" disabled={/\d{4}/.test(code) ? null : true }>
                            {translation.send}
                        </Button>
                    </form>
                </Box>
            case ModalStates.LOADING:
                return <Box className={classes.modalContent}>
                    <CircularProgress style={{ color: theme.palette.secondary.contrastText }}/>
                </Box>
            case ModalStates.PHONE_NUMBER:
                return <Box className={classes.modalContent}>
                    <Box className={classes.containerTitle}>
                        <Typography className={classes.title} variant="h4" align={'center'}>{translation.modalLoginPhoneText}</Typography>
                    </Box>
                    <form className={classes.textFieldContainer} noValidate autoComplete="off" onSubmit={handleSubmitPhoneNumber}>
                        <ReactPhoneInput
                            inputProps={ {
                                style: {
                                    fontFamily: 'srgssr-type-Bd',
                                    fontSize: '1.125rem',
                                    color: '#020202',
                                    border: 'none',
                                    width: '100%',
                                    height: 'auto',
                                    backgroundColor: 'white',
                                    paddingTop: '0.4rem',
                                    paddingBottom: '0.4rem',
                                    margin: '0.2rem',
                                    boxShadow: phoneVerif ? '0 0 0 0.2rem rgba(0, 255, 20, 0.9)' : 'none'
                                },
                                autoFocus: true
                            } }
                            dropdownClass={classes.dropDown}
                            containerClass={classes.container}
                            inputExtraProps={{
                                name: 'phone',
                                required: true,
                                enableSearch: true
                            }}
                            country='ch'
                            onlyCountries={['ch', 'fr', 'it', 'be', 'li']}
                            countryCodeEditable={false}
                            value={userData.phone}
                            onChange={(data) => {
                                setPhoneVerif(phoneVerification(data))
                                setUserData(
                                    Object.assign({}, userData, { phone: data })
                                )
                            }
                            }
                            onKeyDown={KeyCheck}
                        />
                        <Box className={classes.CGU}>
                            {uiElement.agreementsChunks && uiElement.agreementsChunks.map((data, index) => {
                                return (
                                    <Box key={index} className={classes.CGUContent}>
                                        <Checkbox
                                            classes={{ root: [classes.CGUBox, classes.shakeMe].join(' '), checked: classes.CGUBoxCheck }}
                                            icon={uncheckedBoxIcon({ className: classes.iconClass })}
                                            checkedIcon={checkedBoxIcon({ className: classes.iconClassChecked })}
                                            onChange={checkBoxes} />
                                        <Typography className={classes.CGUText} dangerouslySetInnerHTML={{ __html: data }}/>
                                    </Box>
                                )
                            })}
                        </Box>
                        <Button ref={smsSubmit} color="primary" variant="contained" className={classes.button} type="submit" disabled={(!phoneVerif || checked)} >
                            {translation.send}
                        </Button>
                    </form>
                </Box>
            case ModalStates.ERROR:
                return <Box className={classes.modalContent}>
                    <Typography className={classes.title} variant="h4" align={'center'}>Erreur</Typography>
                    {userData.error && <p className="error">Error: {userData.error}</p>}
                </Box>
            }
        }
        return (
            <React.Fragment>
                <WrappedComponent openModal={OpenModal} isModalOpen={open} {...props} />

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={'containerModal'}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500
                    }}
                >
                    <Fade in={open}>
                        <Box className={classes.modal} >
                            {getLoginContent(loginState)}
                        </Box>
                    </Fade>
                </Modal>

            </React.Fragment>
        )
    }
}

export default hasLoginModal
