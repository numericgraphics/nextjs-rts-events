import Head from 'next/head'
import Layout, { siteTitle } from '../components/eventLayout'
import utilStyles from '../styles/utils.module.css'
import { getSortedChallengesData } from '../lib/challenges'
import Link from 'next/link'
import Date from '../components/date'
import Card from '@material-ui/core/Card';

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

        <ul className={utilStyles.list}>
          {allChallengesData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/challenges/[id]" as={`/challenges/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>

        {allChallengesData.map(({ id, date, title }) => (
          <Card key={id}>{id} {date} {title}</Card>
        ))}
    
      </section>

    </Layout>
  )
}