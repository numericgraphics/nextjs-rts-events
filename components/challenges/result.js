import React, { useContext, useEffect, useState } from 'react'
import Router, { withRouter } from 'next/router'
import UserContext from '../UserContext'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade/Fade'
import { ColorBorderButton } from '../ui/ColorBorderButton'
import GiftResult from '../gifts/giftResult'
import giftsModal from '../../hoc/hasGiftsModal'

const useStyles = makeStyles((theme = useTheme()) => ({
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
        marginBottom: 10,
        color: theme.palette.secondary.main
    },
    subTitle: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1.2rem',
        textAlign: 'center',
        lineHeight: 1,
        color: theme.palette.secondary.main

    },
    secondCardTitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1.5rem',
        textAlign: 'center',
        lineHeight: 1,
        marginBottom: 10,
        marginTop: 30,
        color: theme.palette.secondary.main
    },
    secondCardSubTitle: {
        fontFamily: 'srgssr-type-Bd',
        fontSize: '1,125rem',
        lineHeight: 1,
        marginBottom: 10,
        marginTop: 5,
        color: theme.palette.secondary.main
    },
    secondCardText: {
        fontFamily: 'srgssr-type-Rg',
        fontSize: '1,125rem',
        color: theme.palette.secondary.main
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
        fontSize: '2.5rem',
        padding: '6px 20px',
        textAlign: 'center',
        marginTop: '15vh',
        color: theme.palette.secondary.main
    },
    iconType: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'center',
        fontSize: '40px'
    },
    giftContainer: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50px',
        padding: '3px',
        marginBottom: '10px',
        maxWidth: '70vw',
        flexDirection: 'column',
        marginTop: '10px'
    }
}))

function Result (props) {
    const { points, success, gameStats, newUnlockedGifts } = props.content
    const classes = useStyles()
    const [translation, setTranslation] = useState([])
    const [uiElements, setUiElements] = useState({})
    const [showComponent, setShowComponent] = useState(false)
    const { dataProvider, uiElementsService, store } = useContext(UserContext)
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
        setUiElements(uiElementsService.getUiElements())
    }, [])

    // TODO : remove this local translation
    useEffect(() => {
        translation.challengeResultButtonEnded = 'Voir vos scores du jour'
    }, [translation])
    return (
        <Fade in={showComponent} timeout={500}>
            <Box className='content' >
                <Box className='topZone'>
                    <Box className={classes.content}>
                        <Typography className={classes.winPointText}>
                            {gameStats.hasAvailableChallenges
                                ? success
                                    ? `+ ${points} pts` // TODO: Translation pts
                                    : `${points} pts`
                                : `+ ${gameStats.currentScore} pts`
                            }
                        </Typography>
                        <Typography className={classes.title} dangerouslySetInnerHTML={{ __html: uiElements.resultTitleChunk }}/>
                        <Typography className={[classes.subTitle, 'bottom-3-rem'].join(' ')} dangerouslySetInnerHTML={{ __html: uiElements.resultMessageChunk }}/>
                        {!gameStats.hasAvailableChallenges && <Typography className={classes.secondCardTitle}>
                            {translation.challengeResultInfoTitle} <br></br><br></br> {uiElements.noMoreChallengesChunk}
                        </Typography> }
                        {newUnlockedGifts.length
                            ? <React.Fragment>
                                <Typography className={classes.secondCardText}>Tu gagnes une recompense !</Typography>
                                <GiftResult
                                    className={classes.giftContainer}
                                    translation={translation.challengeResultGiftText}
                                    gift={newUnlockedGifts}
                                    onClick={onStart}
                                    setGift={setGift}
                                />
                            </React.Fragment>
                            : null
                        }
                    </Box>
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
