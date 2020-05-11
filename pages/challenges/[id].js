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


const useStyles = makeStyles({
    root: {
        background: 'white',
        minWidth: 275,
        margin: '1rem',
        cursor: 'pointer',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    answers: {
        padding: '1rem',
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
        <article>





            <Typography variant="h5" component="h2">{props.challengeData.title}</Typography>
            <Typography color="textSecondary">
                <Date dateString={props.challengeData.date} />
            </Typography>

            {(() => {
                if (props.started) {
                    return (

                        <div>
                            <Typography variant="body2" component="p">{props.challengeData.question}</Typography>
                            <Grid className={classes.answers} container justify="center" spacing={2}>
                                {Object.keys(props.challengeData.answers).map(key => <PossibleAnswer key={key} val={props.challengeData.answers[key]} />)}
                            </Grid>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <Typography variant="body2" component="p">{props.challengeData.accroche}</Typography>
                            <Grid container justify="center">
                                <Grid item><Button variant="contained" onClick={() => { props.onClick("start") }}>Démarrer le défi</Button></Grid>
                            </Grid>
                        </div>
                    )
                }
            })()}
        </article>
    )

}


class ChallengeController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            started: false,
        }

    }

    handleClick(e) {
        console.log("Click");
        console.log(e);
        switch (e) {
            case "start":
                this.setState({
                    started: true
                });
        }
    }

    render() {

        const started = this.state.started;

        return (
            <ChallengeLayout
                challengeData={this.props.challengeData}
                onClick={(e) => this.handleClick(e)}
                started={started}
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