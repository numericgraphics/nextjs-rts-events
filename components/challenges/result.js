import React, { useContext, useEffect, useState } from 'react'
import Router, { withRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar'
import UserContext from '../UserContext'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { ColorCard } from '../ui/ColorCard'
import { ColorCardContent } from '../ui/ColorCardContent'
import { ColorCardActions } from '../ui/ColorCardAction'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade/Fade'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { getTranslations } from '../../data/tools'
import { ColorBorderButton } from '../ui/ColorBorderButton'
import GiftResult from '../gifts/giftResult'
import giftsModal from '../../hoc/hasGiftsModal'

const useStyles = makeStyles({
    containerGlobal: {
        justifyContent: 'flex-start'
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 2,
        textAlign: 'center',
        marginBottom: 30
    },
    card: {
        minWidth: 275,
        minHeight: 200,
        margin: 20
    },
    title: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.75rem',
        textAlign: 'center',
        lineHeight: 1,
        marginBottom: 10
    },
    subTitle: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1rem',
        textAlign: 'center',
        lineHeight: 1

    },
    secondCardTitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.5rem',
        textAlign: 'center',
        lineHeight: 1,
        marginBottom: 10,
        marginTop: 20
    },
    secondCardSubTitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1,125rem',
        lineHeight: 1,
        marginBottom: 10
    },
    secondCardText: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1,125rem'
    },
    secondCardButton: {
        width: '80vw',
        padding: '6px 20px',
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25rem',
        marginTop: 10
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 275,
        minHeight: 300
    },
    button: {
        width: '80vw',
        padding: '6px 20px',
        borderRadius: 30,
        alignSelf: 'center',
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.25rem',
        marginTop: 10
    },
    cardHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    cardFooter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardHeaderSuccess: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    cardHeaderWrong: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    avatar: {
        width: 100,
        height: 100
    },
    winPointText: {
        fontFamily: 'srgssr-type-Bd',
        color: 'black',
        fontSize: '2.5rem',
        padding: '6px 20px'
    },
    iconType: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'center',
        fontSize: '40px'
    }
})

function Result (props) {
    const { points, message, success, gameStats, newUnlockedGifts } = props.content
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [translation, setTranslation] = useState([])
    const [showComponent, setShowComponent] = useState(false)
    const { dataProvider, store } = useContext(UserContext)
    const { eventName } = store

    async function continueGame () {
        setShowComponent(false)
        props.playGameCallBack()
    }

    async function gotoDashBoard () {
        setShowComponent(false)
        await Router.push('/[events]/dashBoard', `/${eventName}/dashBoard`)
    }

    function onStart () {
        props.openModal()
    }

    function setGift (gift) {
        props.setGift(gift)
    }

    useEffect(() => {
        setShowComponent(true)
        setTranslation(dataProvider.getTranslation())
        setUser(dataProvider.getUser())
    }, [])

    // TODO : remove this local translation
    useEffect(() => {
        translation.challengeResultButtonEnded = 'Voir vos scores du jour'
    }, [translation])

    return (
        <Fade in={showComponent} timeout={500}>
            <Box className='content' >
                <Box className='topZone'>
                    <ColorCard className={classes.card}>
                        <ColorCardContent className={classes.content}>
                            <Box className={classes.cardHeader}>
                                <div className={classes.iconType}>
                                    <CheckIcon fontSize="small" className={classes.rateIcon}/>
                                    <Typography className={classes.cardHeaderSuccess}>
                                        {`${gameStats.successChallengesCount} ${getTranslations(gameStats.successChallengesCount, translation, 'good')}`}
                                    </Typography>
                                </div>
                                <Avatar className={classes.avatar} src={user.avatarURL}/>
                                <div className={classes.iconType}>
                                    <CloseIcon fontSize="small" className={classes.rateIcon}/>
                                    <Typography className={classes.cardHeaderWrong}>
                                        {`${gameStats.failedChallengesCount} ${getTranslations(gameStats.failedChallengesCount, translation, 'wrong')}`}
                                    </Typography>
                                </div>
                            </Box>
                            <Typography className={classes.title}>
                                {success
                                    ? `${translation.challengeResultTitleGood} ${user.nickname}`
                                    : `${translation.challengeResultTitleWrong} ${user.nickname}`}
                            </Typography>
                            <Typography className={classes.subTitle}>
                                {message}
                            </Typography>
                            {!gameStats.hasAvailableChallenges && <Typography className={classes.secondCardTitle}>
                                {translation.challengeResultInfoTitle}
                            </Typography> }
                        </ColorCardContent>
                        <ColorCardActions className={classes.cardFooter}>
                            <Typography className={classes.winPointText}>
                                {gameStats.hasAvailableChallenges
                                    ? success
                                        ? `+ ${points} pts` // TODO: Translation pts
                                        : `${points} pts`
                                    : `+ ${gameStats.currentScore} pts`
                                }
                            </Typography>
                            {newUnlockedGifts.length
                                ? <GiftResult
                                    translation={translation.challengeResultGiftText}
                                    gift={newUnlockedGifts}
                                    onClick={onStart}
                                    setGift={setGift}
                                />
                                : null
                            }
                        </ColorCardActions>
                    </ColorCard>
                </Box>
                <Box className='bottomZone'>
                    {gameStats.hasAvailableChallenges
                        ? <React.Fragment>
                            <ColorBorderButton key={'gotoDashBoard'} variant="outlined" className={['bottomButton', 'bottom-1-rem'].join(' ')} onClick={gotoDashBoard}>
                                {`${translation.challengeResultButtonDashBoard}`}
                            </ColorBorderButton>
                            <Button key={'continueGame'} color="primary" variant="contained" className={['bottomButton', 'bottom-1-rem'].join(' ')} onClick={continueGame}>
                                {`${translation.challengeResultButtonContinue}`}
                            </Button>
                        </React.Fragment>
                        : <Button color="primary" variant="contained" className={['bottomButton', 'bottom-1-rem'].join(' ')} onClick={gotoDashBoard}>
                            {`${translation.challengeResultButtonEnded}`}
                        </Button>
                    }
                </Box>
            </Box>
        </Fade>
    )
}

export default giftsModal(withRouter(Result))
