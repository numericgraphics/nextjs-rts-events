import Layout from '../../components/eventLayout'
import { getAllChallengesIds, getChallengeData } from '../../lib/challenges'
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import PossibleAnswer from '../../components/possibleAnswer'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Div100vh from 'react-div-100vh';


const useStyles = makeStyles({
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    question: {
        background: 'rgba(0,0,0,0.5)',
    },
    mainContainer: {
        maxHeight: '45rem',
        position: 'relative',
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
        padding: '1rem',
        background: 'linear-gradient(to bottom,  rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)', /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    },
    buttonsContainer: {
        position: 'absolute',
        width: '100%',
        bottom: '1rem'
    }
});


export async function getStaticPaths() {
    const paths = getAllChallengesIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const challengeData = await getChallengeData(params.id)
    return {
        props: {
            challengeData
        }
    }
}

function ChallengeLayout(props) {

    console.log(props);
    const classes = useStyles();

    return (
        <Div100vh className={classes.mainContainer}>

            {props.challengeData.backgroundVideo && (
                <video autoPlay={true} muted={props.muted} loop playsInline className={classes.video}>
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
                    <div>
                        <Typography variant="body2" component="p">{props.challengeData.question}</Typography>
                    </div>
                )}

                {!props.started && (
                    <div>
                        <Typography variant="body2" component="p">{props.challengeData.accroche}</Typography>
                    </div>
                )}

            </div>

            <div className={classes.buttonsContainer}>

                {props.started && (

                    <div>
                        <Grid container justify="center">
                            {Object.keys(props.challengeData.answers).map(key => <PossibleAnswer key={key} val={props.challengeData.answers[key]} />)}
                        </Grid>
                    </div>
                )}

                {!props.started && (
                    <div>
                        <Grid container justify="center" >
                            <Grid item><Button variant="contained" onClick={() => { props.onClick("start") }}>Démarrer le défi</Button></Grid>
                        </Grid>
                    </div>
                )}

            </div>

        </Div100vh>
    )

}


class ChallengeController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            started: false,
            muted: true,
        }

    }

    handleClick(e) {
        console.log("Click");
        console.log(e);
        switch (e) {
            case "start":
                this.setState({
                    started: true,
                    muted: false
                });
        }
    }

    render() {

        const started = this.state.started;
        const muted = this.state.muted;

        return (
            <ChallengeLayout
                challengeData={this.props.challengeData}
                onClick={(e) => this.handleClick(e)}
                started={started}
                muted={muted}
            />
        )
    }
}

export default function Challenge({ challengeData }) {

    const classes = useStyles();

    return (
        <Layout>
            <Head>
                <title>{challengeData.title}</title>
            </Head>
            <ChallengeController challengeData={challengeData} />
        </Layout>
    )
}

/*
<div>
                    {Object.keys(challengeData.answers).map( key => <PossibleAnswer key={key} val={challengeData.answers[key]} />)}
                </div>

                <div dangerouslySetInnerHTML={{ __html: challengeData.contentHtml }} />

                <Button onClick={() => { props.onClick("start") }}>Démarrer le défi</Button>
*/