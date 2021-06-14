import React, { useContext, useEffect, useState, useRef } from 'react'
import Modal from '@material-ui/core/Modal'
import Checkbox from '@material-ui/core/Checkbox'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import ColorBackDrop from '../components/ui/modal/ColorBackDrop'
import Router from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import UserContext from '../hooks/userContext'
import SmsInput from '../components/ui/form/SmsInput'
import ReactPhoneInput from 'react-phone-input-2'
import { phoneVerification } from '../data/tools'
import { CustomDisabledButton } from '../components/ui/button/CustomDisabledButton'
import { useStyles, styles } from '../styles/jsx/components/modal/hasLoginModal.style'

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
        const uiElement = dataProvider.getEventUiElements()
        const { agreementsChunks } = uiElement
        const { setLoading, eventName, locale } = store
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
                    body: JSON.stringify({ phone, eventName, locale })
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
                    body: JSON.stringify({ code, eventName, locale })
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
                    <Typography variant="h3" className={'modal-title'} align={'center'} dangerouslySetInnerHTML={{ __html: translation.modalLoginNumberText }}/>
                    <form className={'modal-textField-container'} autoComplete="on" noValidate onSubmit={handleSubmitNumberReceive}>
                        <SmsInput className={classes.smsInput} isWebView={dataProvider.getIsWebView()}onChange={ setCode } />
                        <CustomDisabledButton color="secondary" variant="contained" className={[classes.button, 'button'].join(' ')} type="submit" disabled={/\d{4}/.test(code) ? null : true }>
                            {translation.send}
                        </CustomDisabledButton>
                    </form>
                </Box>
            case ModalStates.LOADING:
                return <Box className={classes.modalContent}>
                    <CircularProgress style={{ color: theme.palette.primary.contrastText }}/>
                </Box>
            case ModalStates.PHONE_NUMBER:
                return <Box className={classes.modalContent}>
                    <Typography variant="h3" className={'modal-title'} align={'center'} dangerouslySetInnerHTML={{ __html: translation.modalLoginPhoneText }}/>
                    <form className={'modal-textField-container'} noValidate autoComplete="off" onSubmit={handleSubmitPhoneNumber}>
                        <ReactPhoneInput
                            inputProps={ {
                                style: {
                                    ...styles.textField,
                                    boxShadow: phoneVerif ? `0 0 0 0.2rem ${theme.palette.formValidate}`
                                        : `0 0 0 0.2rem ${theme.palette.formNoValidate}`
                                },
                                autoFocus: true
                            } }
                            dropdownClass={classes.dropDown}
                            containerClass={'modal-textfield-phone'}
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
                                            classes={{ root: [classes.CGUBox, phoneVerif && classes.shakeMe].join(' '), checked: classes.CGUBoxCheck }}
                                            onChange={checkBoxes} />
                                        <Typography variant="body1" className={classes.CGUText} dangerouslySetInnerHTML={{ __html: data }}/>
                                    </Box>
                                )
                            })}
                        </Box>
                        <CustomDisabledButton ref={smsSubmit} color="secondary" variant="contained" className={[classes.button, 'button'].join(' ')} type="submit" disabled={(!phoneVerif || checked)} >
                            { translation.send }
                        </CustomDisabledButton>
                    </form>
                </Box>
            case ModalStates.ERROR:
                return <Box className={classes.modalContent}>
                    <Typography variant="h3" className={classes.title} align={'center'}>Erreur</Typography>
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
                    BackdropComponent={ColorBackDrop}
                    BackdropProps={{
                        timeout: 500,
                        open: open,
                        onClose: handleClose
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
