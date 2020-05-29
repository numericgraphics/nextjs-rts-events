import React, { useRef } from 'react'
import Layout from '../../components/eventLayout'
import { getAllChallengesIds, getChallengeData } from '../../lib/challenges'
import { makeStyles } from '@material-ui/core/styles'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import PossibleAnswer from '../../components/possibleAnswer'
import Typography from '@material-ui/core/Typography'
import { Button, IconButton } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Div100vh from 'react-div-100vh'
import Link from 'next/link'
import { VolumeOff, VolumeUp, PlayArrow, Pause, Close } from '@material-ui/icons'
import { motion } from 'framer-motion'

const useStyles = makeStyles({
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    question: {
        background: 'rgba(0,0,0,0.5)'
    },
    mainContainer: {
        maxHeight: '45rem',
        position: 'relative'
    },
    video: {
        position: 'absolute',
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        zIndex: 0
    },
    devantLaVideo: {
        position: 'relative',
        zIndex: 1,
        padding: '2.5rem 1rem 1rem',
        background: 'linear-gradient(to bottom,  rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)' /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    },
    buttonsContainer: {
        position: 'absolute',
        width: '100%',
        bottom: '5rem'
    },
    home: {
        position: 'absolute',
        zIndex: 2,
        fontSize: '0.8em',
        right: 0
    },
    controls: {
        position: 'absolute',
        left: 0,
        zIndex: 2
    },
    controlBtn: {
        color: 'red'
    }

})

export async function getStaticPaths () {
    const paths = getAllChallengesIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params }) {
    const challengeData = await getChallengeData(params.id)
    return {
        props: {
            challengeData
        }
    }
}

function ChallengeLayout (props) {
    console.log(props)
    const classes = useStyles()
    const vidRef = useRef(null)

    return (
        <Div100vh className={classes.mainContainer}>

            <div className={classes.home} >
                <Link href="/">
                    <a><IconButton onClick={() => props.onClick('close', null)}><Close className={classes.controlBtn} /></IconButton></a>
                </Link>
            </div>

            {props.challengeData.backgroundVideo && (
                <div className={classes.controls} >
                    {props.muted && props.started && (
                        <IconButton onClick={() => props.onClick('unMute', null)}><VolumeUp className={classes.controlBtn} /></IconButton>
                    )}
                    {!props.muted && props.started && (
                        <IconButton onClick={() => props.onClick('mute', null)}><VolumeOff className={classes.controlBtn} /></IconButton>
                    )}
                    {props.paused && (
                        <IconButton onClick={() => props.onClick('play', vidRef)}><PlayArrow className={classes.controlBtn} /></IconButton>
                    )}
                    {!props.paused && (
                        <IconButton onClick={() => props.onClick('pause', vidRef)}><Pause className={classes.controlBtn} /></IconButton>
                    )}
                </div>
            )}

            {props.challengeData.backgroundVideo && (
                <video ref={vidRef} autoPlay={!props.paused} muted={props.muted} loop playsInline className={classes.video}>
                    <source src={props.challengeData.backgroundVideo}
                        type="video/mp4" />
                </video>
            )}

            {!props.challengeData.backgroundVideo && props.challengeData.backgroundImage && (
                <div className={`${utilStyles.kenwrap}`}>
                    <img className={`${utilStyles.kenimg}`} src={props.challengeData.backgroundImage} />
                </div>
            )}

            <div className={classes.devantLaVideo}>

                <Typography variant="h5" component="h2">{props.challengeData.title}</Typography>

                {props.started && (
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <Typography variant="body2" component="p">{props.challengeData.question}</Typography>
                    </motion.div>
                )}

                {!props.started && (
                    <div>
                        <Typography variant="body2" component="p">{props.challengeData.accroche}</Typography>
                    </div>
                )}

            </div>

            <div className={classes.buttonsContainer}>

                {props.started && (
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20
                        }}

                    >
                        <Grid container justify="center">
                            {Object.keys(props.challengeData.answers).map(key => <PossibleAnswer key={key} val={props.challengeData.answers[key]} />)}
                        </Grid>
                    </motion.div>
                )}

                {!props.started && (

                    <Grid container justify="center" >
                        <Grid item><Button variant="contained" onClick={() => { props.onClick('start', null) }}>Démarrer le défi</Button></Grid>
                    </Grid>

                )}

            </div>

        </Div100vh>
    )
}

class ChallengeController extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            started: false,
            muted: true,
            paused: false
        }
    }

    handleClick (e, param) {
        console.log('Click')
        console.log(e)
        console.log(param)
        switch (e) {
        case 'start':
            this.setState({
                started: true,
                muted: false
            })
            break
        case 'mute':
            this.setState({
                muted: true
            })
            break
        case 'unMute':
            this.setState({
                muted: false
            })
            break
        case 'play':
            this.setState({
                paused: false
            })
            param.current.play()
            break
        case 'pause':
            this.setState({
                paused: true
            })
            param.current.pause()
            break
        }
    }

    render () {
        const started = this.state.started
        const muted = this.state.muted
        const paused = this.state.paused

        return (
            <ChallengeLayout
                challengeData={this.props.challengeData}
                onClick={(e, param) => this.handleClick(e, param)}
                started={started}
                muted={muted}
                paused={paused}
            />
        )
    }
}

export default function Challenge ({ challengeData }) {
    return (

        <motion.div
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20
            }}
        >
            <Layout>
                <Head>
                    <title>{challengeData.title}</title>
                </Head>
                <ChallengeController challengeData={challengeData} />
            </Layout>
        </motion.div>

    )
}
