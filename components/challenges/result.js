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
import { useHeight } from '../../hooks/useHeight'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade/Fade'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { getTranslations } from '../../data/tools'

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
        marginBottom: 50
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
        height: 100,
        border: 'solid',
        borderColor: 'gray'
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
        alignSelf: 'center'
    }
})
const styles = {
    containerOverlay: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100vw',
        zIndex: 3
    },
    containerImage: {
        position: 'absolute',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'auto 100%',
        width: '100vw',
        backgroundColor: 'gray',
        filter: 'blur(4px)'
    }
}

function Result (props) {
    const { points, score, message, success, hasAvailableChallenges } = props.content
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [translation, setTranslation] = useState([])
    const [showComponent, setShowComponent] = useState(false)
    const { dataProvider } = useContext(UserContext)
    const height = useHeight()

    async function continueGame () {
        setShowComponent(false)
        props.playGameCallBack()
    }

    async function gotoDashBoard () {
        setShowComponent(false)
        await Router.push('/dashBoard')
    }

    useEffect(() => {
        setShowComponent(true)
        setTranslation(dataProvider.getTranslation())
        // TODO : remove this local translation
        translation.challengeResultButtonEnded = 'Voir vos scores du jour'
        setUser(dataProvider.getUser())
    }, [])

    /*  function getTranslations (string, score) {
        if (score <= 1 && string) {
            string = string.substr(0, string.length - 1)
            console.log('ici : ', string)
            // setTranslation(copy)
        // translation.good = translation.good.substr(0, 7)
        // setTranslation.good(translation.good.substr(0, 7))
        }
        return string
    } */

    // TODO : remove this local translation
    useEffect(() => {
        translation.challengeResultButtonEnded = 'Voir vos scores du jour'
    }, [translation])

    return (
        <Fade in={showComponent} timeout={500}>
            <Box style={{ ...styles.containerOverlay, minHeight: height }} >
                <ColorCard className={classes.card}>
                    <ColorCardContent className={classes.content}>
                        <Box className={classes.cardHeader}>
                            <div className={classes.iconType}>
                                <CheckIcon fontSize="medium" className={classes.rateIcon}></CheckIcon>
                                <Typography className={classes.cardHeaderSuccess}>
                                    {`${score.success} ${getTranslations(score.success, translation, 'good')}`}
                                </Typography>
                            </div>
                            <Avatar className={classes.avatar} src={user.avatarURL}/>
                            <div className={classes.iconType}>
                                <CloseIcon fontSize="medium" className={classes.rateIcon}></CloseIcon>
                                <Typography className={classes.cardHeaderWrong}>
                                    {`${score.failure} ${getTranslations(score.failure, translation, 'wrong')}`}
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
                        {!hasAvailableChallenges && <Typography className={classes.secondCardTitle}>
                            {translation.challengeResultInfoTitle}
                        </Typography> }
                    </ColorCardContent>
                    <ColorCardActions className={classes.cardFooter}>
                        <Typography className={classes.winPointText}>

                            {hasAvailableChallenges
                                ? success
                                    ? `+ ${points} pts`
                                    : `${points} pts`
                                : `+ ${score.totalPoints} pts`
                            }

                        </Typography>
                    </ColorCardActions>
                </ColorCard>
                <Box className={classes.footer}>
                    {hasAvailableChallenges
                        ? <Box>
                            <Button key={'gotoDashBoard'} color="primary" variant="contained" className={classes.button} onClick={gotoDashBoard}>
                                {`${translation.challengeResultButtonDashBoard}`}
                            </Button>
                            <Button key={'continueGame'} color="primary" variant="contained" className={classes.button} onClick={continueGame}>
                                {`${translation.challengeResultButtonContinue}`}
                            </Button>
                        </Box>
                        : <Button color="primary" variant="contained" className={classes.button} onClick={gotoDashBoard}>
                            {`${translation.challengeResultButtonEnded}`}
                        </Button>
                    }
                </Box>
            </Box>
        </Fade>
    )
}

export default withRouter(Result)
