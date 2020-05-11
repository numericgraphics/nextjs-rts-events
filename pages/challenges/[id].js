import Layout from '../../components/eventLayout'
import { getAllChallengesIds, getChallengeData } from '../../lib/challenges'
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import PossibleAnswer from '../../components/possibleAnswer'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


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

class Plouf extends React.Component {

    render() {

        return (
            <article>
                <Typography variant="h5" component="h2">{this.props.challengeData.title}</Typography>
                <Typography color="textSecondary">
                    <Date dateString={this.props.challengeData.date} />
                </Typography>
                <Typography variant="body2" component="p">{this.props.challengeData.accroche}</Typography>
                <Button>Démarrer le défi</Button>
            </article>
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
            <Plouf challengeData={challengeData} />
        </Layout>
    )
}

/*
<div>
                    {Object.keys(challengeData.answers).map( key => <PossibleAnswer key={key} val={challengeData.answers[key]} />)}
                </div>

                <div dangerouslySetInnerHTML={{ __html: challengeData.contentHtml }} />
*/