import Head from 'next/head'
import Layout, { siteTitle } from '../components/eventLayout'
import ChallengeCard from '../components/challengeCard'
import utilStyles from '../styles/utils.module.css'
import { getSortedChallengesData } from '../lib/challenges'
import Link from 'next/link'
import Date from '../components/date'



export async function getStaticProps() {
  const allChallengesData = getSortedChallengesData()
  return {
    props: {
      allChallengesData
    }
  }
}



export default function Home({ allChallengesData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Description
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Challenges List</h2>

        {allChallengesData.map(({ id, date, title }) => (
          <ChallengeCard key={id} cardTitle={title} date={date} challengeID={id} />
        ))}

      </section>

    </Layout>
  )
}