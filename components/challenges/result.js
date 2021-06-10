import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import UserContext from '../../hooks/userContext'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade/Fade'
import { ColorBorderButton } from '../ui/button/ColorBorderButton'
import GiftResult from '../gifts/giftResult'
import { preLoadImage } from '../../data/tools'
import { useStylesGlobal } from '../../styles/jsx/global.style'
import { ColorCard } from '../ui/card/ColorCard'
import CardContent from '@material-ui/core/CardContent'
import { useStyles } from '../../styles/jsx/pages/result.style'
import HasTypeFormModal from '../../hoc/hasTypeFormModal'

function Result (props) {
    const stylesGlobal = useStylesGlobal()
    const { success, gameStats, newUnlockedGifts } = props.content
    const { nextAvailableChallengeImageURL, nextAvailableChallengeImageURLDesktop } = gameStats || {}
    const classes = useStyles()
    const [translation, setTranslation] = useState([])
    const [uiElements, setUiElements] = useState({})
    const [showComponent, setShowComponent] = useState(false)
    const { dataProvider, uiElementsService } = useContext(UserContext)
    const [openFeedback, setOpenFeedback] = useState(false)
    const [hasAvailableChallenges, setHasAvailableChallenges] = useState(true)

    async function continueGame () {
        setShowComponent(false)
        props.playGameCallBack()
    }

    async function gotoDashBoard () {
        setShowComponent(false)
        props.gotoDashBoard()
    }

    function onStart () {
        props.openModal()
    }

    function imagePreCacheCallBack (result) {
        if (!result) {
            console.log('IMAGE PRE-CACHED ERROR - RESULT COMPONENT')
        }
    }

    function successVariant () {
        let variant
        success ? variant = 'h1' : variant = 'subtitle1'
        return variant
    }

    useEffect(() => {
        if (nextAvailableChallengeImageURL) {
            preLoadImage(nextAvailableChallengeImageURL, imagePreCacheCallBack)
        } else if (nextAvailableChallengeImageURLDesktop) {
            preLoadImage(nextAvailableChallengeImageURLDesktop, imagePreCacheCallBack)
        }
        setTranslation(dataProvider.getTranslation())
        setUiElements(uiElementsService.getUiElements())
        setShowComponent(true)
        setHasAvailableChallenges(dataProvider.hasAvailableChallenges())
    }, [])

    return (
        <Fade in={showComponent} timeout={1000}>
            <Box className='content' >
                { openFeedback && <HasTypeFormModal
                    gameStats={gameStats}
                    setOpenFeedback={setOpenFeedback}/>
                }
                <Box className='topZoneResult'>
                    <Box className={classes.content}>
                        <Box className={classes.header}>
                            <Typography
                                variant="h1"
                                className={classes.title}
                                dangerouslySetInnerHTML={{ __html: uiElements.resultTitleChunk }}
                            />
                            <Typography
                                variant="subtitle1"
                                className={classes.subTitle}
                                dangerouslySetInnerHTML={{ __html: uiElements.resultMessageChunk }}
                            />
                            {uiElements.resultAnswerDetailsChunk &&
                            <Typography
                                variant="subtitle1"
                                className={classes.subTitle}
                                dangerouslySetInnerHTML={{ __html: uiElements.resultAnswerDetailsChunk }}
                            />
                            }
                            {!hasAvailableChallenges &&
                                <Typography
                                    className={classes.secondCardTitle}
                                    dangerouslySetInnerHTML={{ __html: `${translation.challengeResultInfoTitle} </br> ${uiElements.noMoreChallengesChunk}` }}/>
                            }
                        </Box>
                        <ColorCard className={classes.colorCard}>
                            <CardContent className={classes.cardContent}>
                                <Typography
                                    className={classes.winPointText}
                                    variant={successVariant()}
                                    dangerouslySetInnerHTML={{ __html: `${uiElements.resultBoxChunk}` }}
                                />
                                {newUnlockedGifts.length ? <Typography
                                    variant="h3"
                                    className={classes.secondCardText}
                                    dangerouslySetInnerHTML={{ __html: translation.challengeResultWinGift }}
                                /> : null
                                }
                            </CardContent>
                        </ColorCard>

                        {!!newUnlockedGifts.length &&
                            <GiftResult
                                className={classes.giftContainer}
                                translation={translation.challengeResultGiftText}
                                gift={newUnlockedGifts}
                                onClick={onStart}
                                setGift={props.setGift}
                            />
                        }
                    </Box>
                </Box>
                <Box className={[stylesGlobal.bottomZoneGradient, 'bottomZone'].join(' ')}>
                    {hasAvailableChallenges
                        ? <React.Fragment>
                            <ColorBorderButton
                                key={'gotoDashBoard'}
                                variant="outlined"
                                className={'buttonAlt'}
                                onClick={gotoDashBoard}>
                                {`${translation.challengeResultButtonDashBoard}`}
                            </ColorBorderButton>
                            <Button key={'continueGame'}
                                color="secondary"
                                variant="contained"
                                className={'button'}
                                onClick={continueGame}
                            >
                                {`${translation.challengeResultButtonContinue}`}
                            </Button>
                        </React.Fragment>
                        : <React.Fragment>
                            { gameStats.feedbackURL &&
                            <ColorBorderButton
                                key={'openFeedBackModal'}
                                variant="outlined"
                                className={'buttonAlt'}
                                onClick={() => setOpenFeedback(!openFeedback)}
                            >
                                {`${translation.feedbackButtonOnResult}`}
                            </ColorBorderButton>
                            }
                            <Button
                                color="secondary"
                                variant="contained"
                                className={'button'}
                                onClick={gotoDashBoard}
                            >
                                {`${translation.challengeResultButtonEnded}`}
                            </Button>
                        </React.Fragment>
                    }
                </Box>
            </Box>
        </Fade>
    )
}

export default withRouter(Result)
