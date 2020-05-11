import Layout from '../../components/eventLayout'
import { getAllChallengesIds, getChallengeData } from '../../lib/challenges'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

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

export default function Challenge({ challengeData }) {
    return (
        <Layout>
            <Head>
                <title>{challengeData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{challengeData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={challengeData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: challengeData.contentHtml }} />
            </article>
        </Layout>
    )
}