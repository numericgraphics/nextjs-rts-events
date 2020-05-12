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
          Venez tester vos connaissances sportives et tentez de gagner des cadeaux!!
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

        {allChallengesData.map(({ id, date, title, accroche }) => (
          <ChallengeCard key={id} cardTitle={title} date={date} challengeID={id} accroche={accroche} />
        ))}

      </section>

    </Layout>
  )
}